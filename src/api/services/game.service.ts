/* eslint-disable import/no-anonymous-default-export */
import Partner from "@/config/Partner";
import { contentInstance } from "@/configs/CustomizeAxios";
import { SignInReq } from "../types/auth.interface";
import { ConfigGameEndPoint, ConfigAuthEndPoint } from "./contants";

/**
 * Lấy danh sách game available - Giống BC88BET
 */
const getListGameAvalible = () => {
  return contentInstance.get(`/api/game/gameAvalible`);
};

/**
 * Lấy danh sách game bắn cá - Giống BC88BET
 */
const getListGameFish = () => {
  return contentInstance.get(`/api/product/fish`);
};

/**
 * Lấy danh sách game theo productType và gameType - Giống BC88BET
 * @param productType - Loại sản phẩm (VD: "FC", "PG", "JL", etc.)
 * @param gameType - Loại game (VD: "RNG", "LIVE", "SPORT", etc.)
 */
const getListGame = (productType: string, gameType: string) => {
  return contentInstance.get(`/api/product/${productType}/${gameType}`);
};

/**
 * Lấy danh sách game hot - Giống BC88BET
 */
const getGameHot = () => {
  return contentInstance.get(`/api/product/hot-games`);
};

/**
 * Lấy danh sách game available (cũ - giữ lại để tương thích)
 */
const GameAvalible = ({
  category,
  game,
}: {
  category: string;
  game: string | null;
}) =>
  contentInstance.get(`${ConfigGameEndPoint.GETGAMELIST}?category=${category}&game=${game}`);

const lauchgame = ({
  username,
  device,
  lang,
  gameid,
  gpid,
}: {
  username: string;
  device: string;
  lang: string;
  gameid: number;
  gpid: number;
}) =>
  contentInstance.get(`${ConfigGameEndPoint.LAUCHGAME}?username=${username}&device=${device}&lang=${lang}&gameid=${gameid}&gpid=${gpid}`);

const lauchgameType2 = async ({
  supplier,
  device,
  lang,
  gameid,
  type,
  gpid,
}: {
  supplier: string;
  device: string;
  lang: string;
  gameid: number | string;
  gpid: number | string;
  type: number | string;
}) =>
  await contentInstance.get(`${ConfigGameEndPoint.LAUCHGAME}/${supplier}?&device=${device}&lang=${lang}&gameid=${gameid}&gpid=${gpid}&type=${type}`);

/**
 * BC88BET style: Launch game by code and id
 * @param code - Game code (codeGame, tcgGameCode, productCode)
 * @param id - Game ID (gameId, productCode, game_code)
 */
const getPlayGameById = async (code: string, id: string) => {
  return contentInstance.get(`/api/game/launchgame/${id}?code=${code}`);
};

const GameAvalibleV2 = async (data: {
  gpIds: string[];
  gameTypes: string[];
  maxRank?: number;
  partner?: string;
}) =>
  await contentInstance.post(ConfigGameEndPoint.GAME_AVALIBLE_NEW, {
    ...data,
    pn: data.partner ? data.partner : Partner.FE,
  });

const GameAvalibleNewV2 = async (data: {
  gpIds: string[] | undefined;
  gameTypes: string[] | undefined;
  rankType?: "rank" | "rank_super" | "rank_hot" | "rank_new";
  pn: string | null;
  page?: number;
  limit?: number;
}) => {
  try {
    const res = await contentInstance.post(ConfigGameEndPoint.GAME_AVALIBLE_NEW_V2, {
      ...data,
      rankType: data?.rankType ? data?.rankType : "rank",
    });
    return res?.data?.data;
  } catch (error: any) {
    // Nếu endpoint không tồn tại (404), return empty array thay vì throw error
    if (error?.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

const AddGameFavorite = async (gameId: number | string, partnerName: string) => {
  try {
    await contentInstance.post(ConfigGameEndPoint.FAVORITE_ADD, {
      gameId: gameId,
      partnerName: partnerName,
    });
  } catch (error: any) {
    // Nếu endpoint không tồn tại (404), không throw error (silent fail)
    if (error?.response?.status === 404) {
      return;
    }
    throw error;
  }
};

const ListGameFavorite = async () => {
  try {
    const res = await contentInstance.get(ConfigGameEndPoint.FAVORITE_LIST);
    return res.data;
  } catch (error: any) {
    // Nếu endpoint không tồn tại (404), return empty array và không log error
    if (error?.response?.status === 404) {
      return { data: [] };
    }
    // Nếu có lỗi khác, return empty array để không break app
    console.error("ListGameFavorite error:", error);
    return { data: [] };
  }
};

const DeleteGameFavorite = async (
  gameId: number | string,
  partnerName: string
) => {
  try {
    await contentInstance.post(ConfigGameEndPoint.FAVORITE_DELETE, {
      gameId: gameId,
      partnerName: partnerName,
    });
  } catch (error: any) {
    // Nếu endpoint không tồn tại (404), không throw error (silent fail)
    if (error?.response?.status === 404) {
      return;
    }
    throw error;
  }
};
export default {
  lauchgame,
  GameAvalible,
  lauchgameType2,
  GameAvalibleV2,
  GameAvalibleNewV2,
  AddGameFavorite,
  ListGameFavorite,
  DeleteGameFavorite,
  // BC88BET style APIs
  getListGameAvalible,
  getListGameFish,
  getListGame,
  getGameHot,
  getPlayGameById, // BC88BET style: launch game by code and id
};

// Export named để dễ import
export {
  getListGameAvalible,
  getListGameFish,
  getListGame,
  getGameHot,
  getPlayGameById,
};
