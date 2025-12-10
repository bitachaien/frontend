/**
 * usePlayGame Hook - Chơi game với auto wallet transfer
 * BC88BET style: Mở window trước → Gọi API → Transfer wallet → Redirect
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert2";
import gameService, { getPlayGameById } from "@/api/services/game.service";
import walletService from "@/api/services/wallet.service";
import {
  GameConfig,
  GameConfigItem,
  findGameConfigBySupplier,
  findGameConfigByCode,
} from "@/config/GameConfig";
import { mapGameNameToProductType } from "@/utils/gameApiHelper";
import { useUser } from "@/context/useUserContext";
import useLaunchGameDevice from "./useLaunchGameDevice";

interface PlayGameParams {
  gameId: number | string;
  gpid: number | string;
  supplier: string;
  type: number | string;
  code?: string; // Optional: Game code (codeGame, tcgGameCode, productCode) - BC88BET style
  id?: string; // Optional: Game ID (gameId, productCode, game_code) - BC88BET style
  lang?: string; // Optional: mặc định "en"
  gamename?: string; // Optional: Game name từ URL (fallback để tìm config)
}

export const usePlayGame = () => {
  const router = useRouter();
  const deviceC = useLaunchGameDevice();
  const { user, setLoadingGame, refreshBalance } = useUser();
  const [loading, setLoading] = useState(false);

  /**
   * Chơi game với auto transfer - BC88BET style
   * Flow: Mở window trước → Gọi API → Transfer wallet → Redirect window
   */
  const playGame = async ({
    gameId,
    gpid,
    supplier,
    type,
    code,
    id,
    lang = "en",
    gamename,
  }: PlayGameParams) => {
    // Check authentication
    if (!user?.username) {
      router.push(
        `/lobby/navigation/LoginToSupplier?d=${deviceC}&gameid=${gameId}&gpid=${gpid}&supplier=${supplier}&type=${type}&lang=${lang}`
      );
      return;
    }

    // 1. Tìm config game để lấy code và type
    // BC88BET style: 
    // - `id` (gameId) là mã nhà cung cấp (ví dụ: "SB", "PG", "JL") - từ product_code
    // - `code` (codeGame) là mã game cụ thể (ví dụ: "SB0001", "PG0123") - từ game_code
    // - Tìm config theo `id` (product_code) trước, vì đó là mã nhà cung cấp
    let gameConfig: GameConfigItem | null = null;
    
    // Ưu tiên 1: Tìm theo id (product_code từ BC88BET - mã nhà cung cấp)
    // BC88BET: GameConfig.find((item) => item.code === id)
    if (id) {
      gameConfig = GameConfig.find((item) => item.code.toLowerCase() === String(id).toLowerCase()) || null;
    }
    
    // Ưu tiên 2: Nếu chưa tìm thấy và có code (codeGame), thử extract mã nhà cung cấp từ code
    // Ví dụ: "PG0001" -> "PG", "JL0091" -> "JL", "SB0001" -> "SB"
    if (!gameConfig && code) {
      // Extract mã nhà cung cấp từ codeGame
      // Pattern 1: 2-4 ký tự chữ cái đầu (ví dụ: "PG0001" -> "PG", "JL0091" -> "JL")
      let providerCode = code.match(/^([A-Z]{2,4})/)?.[1];
      
      // Pattern 2: Nếu không match, thử pattern khác (ví dụ: "SB0001" -> "SB")
      if (!providerCode) {
        providerCode = code.match(/^([A-Z]+)/)?.[1];
      }
      
      if (providerCode) {
        gameConfig = GameConfig.find((item) => item.code.toLowerCase() === providerCode.toLowerCase()) || null;
      }
      
      // Nếu vẫn không tìm thấy, thử tìm trực tiếp theo code (có thể code là mã nhà cung cấp)
      if (!gameConfig) {
        gameConfig = GameConfig.find((item) => item.code.toLowerCase() === String(code).toLowerCase()) || null;
      }
    }
    
    // Ưu tiên 3: Tìm theo supplier (partnerName)
    if (!gameConfig && supplier) {
      gameConfig = findGameConfigBySupplier(supplier);
    }
    
    // Ưu tiên 4: Tìm theo gpid (providerId)
    if (!gameConfig && gpid) {
      gameConfig = GameConfig.find((item) => String(item.gpid) === String(gpid)) || null;
    }
    
    // Ưu tiên 5: Tìm theo gameId (nếu gameId là số, có thể là providerId)
    if (!gameConfig && gameId && typeof gameId === 'number') {
      gameConfig = GameConfig.find((item) => String(item.gpid) === String(gameId)) || null;
    }
    
    // Ưu tiên 6: Tìm theo gamename từ URL (fallback cuối cùng)
    if (!gameConfig && gamename) {
      const productType = mapGameNameToProductType(gamename);
      if (productType) {
        gameConfig = findGameConfigByCode(productType);
      }
    }

    if (!gameConfig) {
      console.error("Game config not found:", { code, id, supplier, gameId, gpid });
      swal.fire("Lỗi", "Không tìm thấy cấu hình game", "error");
      return;
    }

    // 2. Xác định code và id cho BC88BET API
    // BC88BET API: getPlayGameById(code, id)
    // - code: codeGame (mã game cụ thể, ví dụ: "SB0001", "PG0123")
    // - id: gameId (mã nhà cung cấp, ví dụ: "SB", "PG")
    // Nếu có code từ params (codeGame), dùng nó; nếu không, dùng gameConfig.code
    const gameCodeForAPI = code || gameConfig.code;
    // id là gameId (mã nhà cung cấp), ưu tiên id từ params, sau đó là gameConfig.code
    const gameIdForAPI = id || gameConfig.code || String(gameId);

    // 3. Mở window trước (BC88BET style)
    const tempWindow = window.open("", "_blank");
    if (!tempWindow) {
      swal.fire(
        "Chuyển tiền không thành công",
        "Cửa sổ bật lên bị chặn bởi trình duyệt. Vui lòng cho phép cửa sổ bật lên.",
        "error"
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setLoadingGame(true);

      // 4. Gọi API để lấy playUrl TRƯỚC (BC88BET style - giống y hệt)
      // BC88BET: getPlayGameById(code, id)
      const res: any = await getPlayGameById(gameCodeForAPI, gameIdForAPI);

      // 5. Chuyển tiền từ ví chính → ví game (BC88BET style - giống y hệt)
      // BC88BET: walletTransfer(user.coin, String(dataGame?.type), 1)
      // Lưu ý: bc88bet dùng user.coin, nhưng nếu không có thì dùng user.balance
      const userCoin = user.coin ?? user.balance ?? 0;
      let wallet: any = null;
      try {
        const walletResponse: any = await walletService.walletTransfer(
          userCoin,
          gameConfig.type, // walletTransfer sẽ tự convert sang string
          1
        );

        // BC88BET: walletTransfer trả về axios response, wallet có thể là response.data hoặc response
        // Kiểm tra cả walletResponse.data và walletResponse
        wallet = walletResponse?.data || walletResponse;
      } catch (walletError: any) {
        console.error("Wallet transfer error:", walletError);
        // Nếu lỗi, wallet = null, sẽ bị catch ở check bên dưới
        wallet = null;
      }

      // Debug logging
      console.log("=== WALLET TRANSFER DEBUG ===");
      console.log("User coin:", user.coin);
      console.log("User balance:", user.balance);
      console.log("User coin (used):", userCoin);
      console.log("Game config type:", gameConfig.type);
      console.log("Wallet (processed):", wallet);
      console.log("Res (playUrl):", res);
      console.log("Res data playUrl:", res?.data?.playUrl);

      // 6. Kiểm tra response (BC88BET style - giống y hệt)
      if (res.status === false) {
        tempWindow.close();
        swal.fire("Lỗi", res.msg, "error");
        setLoading(false);
        setLoadingGame(false);
        return;
      }

      // 7. BC88BET: Kiểm tra playUrl và wallet (giống y hệt)
      // BC88BET chỉ kiểm tra wallet có tồn tại không (truthy check)
      if (res?.data?.playUrl && wallet) {
        tempWindow.location.href = res.data.playUrl;
        setLoading(false);
        setLoadingGame(false);
      } else {
        tempWindow.close();
        console.error("Failed to launch game:", {
          hasPlayUrl: !!res?.data?.playUrl,
          hasWallet: !!wallet,
          walletValue: wallet,
          resValue: res
        });
        swal.fire("Lỗi", res.msg || "Không thể khởi động game", "error");
        setLoading(false);
        setLoadingGame(false);
      }
    } catch (error) {
      tempWindow.close();
      console.log("error", error);
      swal.fire("Lỗi", "Bạn chưa đăng nhập", "error");
      setLoading(false);
      setLoadingGame(false);
    }
  };

  return {
    playGame,
    loading,
  };
};

export default usePlayGame;

