/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  getValueFishGame,
  useGetGameAvalibleNewV2ByGameName,
} from "@/hooks/useGetGameByGameName";
import useSupplierLogo from "@/hooks/useSupplierLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import styles from "@/styles/casino.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HotTheGame from "@/components/HotTheGame";
import { LoadingOutlined } from "@ant-design/icons";
import IntroducingGame from "@/components/IntroducingGame";
import GameType from "@/config/GameType";
import NavigationGameComponent from "@/components/NavigationGame";
import { getListGameFish, getListGame } from "@/api/services/game.service";
import { mapGameNameToProductType, normalizeGames, normalizeGamesTo789BET } from "@/utils/gameApiHelper";

interface IGameOption {
  value: string;
  title: string;
  typeRank: number;
  typeGame?: string;
}

export default function SportGame() {
  const [searchValue, setSearchValue] = useState("");
  const [propSearchValue, setPropSearchValue] = useState("");
  const { gameName } = useParams<{ gameName: string }>();
  const { banner, logo, bgInput, bgItem, colorTitle, bgTitle, navigatorBg, pagnigatorBg } =
    useSupplierLogo(gameName);
  const { listGameOption } = getValueFishGame(gameName) as any;

  const [activeItem, setActiveItem] = useState<IGameOption>(listGameOption[0]);
  const [queryValue, setQueryValue] = useState({
    typeRank: listGameOption[0]?.typeRank,
    typeGame: listGameOption[0]?.typeGame || "fish",
  });

  const tabSearch =
    (listGameOption && listGameOption.find((item: any) => item?.value === "all")) ||
    listGameOption.find((item: any) => item?.value === "fish");

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      setActiveItem(tabSearch);
      setPropSearchValue(searchValue);
    }
  };

  // BC88BET style: Lấy danh sách game bắn cá từ API
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allGames, setAllGames] = useState<any[]>([]); // Cache tất cả games

  // Map gameName sang productType và gameType
  const productType = mapGameNameToProductType(gameName || "");
  const gameType = "FISH"; // Fish games dùng FISH

  // Fetch data một lần khi gameName thay đổi
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      setIsFetching(true);
      
      try {
        // BC88BET: Lấy game bắn cá theo nhà cung cấp
        // BC88BET sử dụng getListGameFish() và filter theo gameType == ProductType
        const res = await getListGameFish();
        const rawGames = normalizeGames(res?.data || res);
        
        // BC88BET: Filter theo gameType field (productType) nếu có
        let games: any[] = [];
        if (productType && rawGames.length > 0) {
          // BC88BET filter: item.gameType == ProductType
          const filtered = rawGames.filter((item: any) => 
            String(item.gameType) === String(productType) ||
            item.product_code === productType ||
            item.productCode === productType
          );
          games = normalizeGamesTo789BET(filtered);
        } else {
          games = normalizeGamesTo789BET(rawGames);
        }
        
        setAllGames(games);
      } catch (error) {
        console.error("Error fetching fish games:", error);
        setAllGames([]);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    };

    if (gameName) {
      fetchGames();
    }
  }, [gameName, productType]); // Chỉ fetch khi gameName/productType thay đổi

  // Filter games client-side khi activeItem thay đổi (không fetch lại)
  // Sử dụng useMemo để tối ưu performance
  const ListGame = useMemo(() => {
    return allGames;
  }, [allGames]);

  return (
    <NavigationGameComponent>
      <div
        className={`w-full flex flex-col items-center border-solid border-[1px] pb-[30px]  bg-white min-h-screen`}
        style={
          {
            // backgroundImage: bgUrl && `url(${bgUrl})`,
          }
        }
      >
        <div className="w-[850px] h-[80px] flex justify-between items-center">
          <div className="logo ">
            {logo && (
              <img
                loading="lazy"
                src={logo}
                alt=""
              />
            )}
          </div>

          <div
            className="flex rounded p-1 items-center gap-1"
            style={{
              background: bgInput,
            }}
          >
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.customeInputSearch}
              placeholder="Vui lòng nhập tên trò chơi."
            />
            <FontAwesomeIcon
              icon={faSearch}
              fontSize={20}
              color="#fff"
              onClick={() => {
                setActiveItem(tabSearch);
                setPropSearchValue(searchValue);
              }}
              className="mx-2 text-white cursor-pointer"
            />
          </div>
        </div>
        <div
          className="mb-[20px] w-full flex justify-center content-center"
          style={{
            background: bgTitle,
          }}
        >
          <div className="w-[850px] flex items-center flex-wrap py-[10px] gap-4 font-roHe">
            {listGameOption.length > 0 &&
              listGameOption.map((item: any, index: number) => {
                return (
                  <p
                    onClick={() => {
                      setActiveItem(item);
                      setQueryValue({
                        typeRank: item.typeRank,
                        typeGame: item.typeGame || "fish",
                      });
                      setSearchValue("");
                      setPropSearchValue("");
                    }}
                    className={`text-white ${
                      activeItem?.value !== item.value
                        ? `${styles[`${gameName}`]}`
                        : `${styles[`${gameName}Hover`]}`
                    } text-[15px] h-[30px]  px-4 py-2 flex justify-center items-center rounded-full cursor-pointer`}
                    key={index}
                  >
                    {item?.title}
                  </p>
                );
              })}
          </div>
        </div>

        {banner && (
          <img
            className="mb-4"
            src={banner}
            alt=""
          />
        )}

        <div className={`${activeItem?.value === "hot" ? "block" : "hidden"}`}>
          <IntroducingGame
            gamename={gameName}
            type={[GameType.FH, GameType.FISHING]}
            linkRecommend="/games/FishGame/RecommendGame"
            key={"fish-intro"}
          />
        </div>

        {ListGame.length && activeItem?.value === "hot" && (
          <div
            className={styles.gameHeadLine}
            style={{
              borderColor: bgTitle,
            }}
          >
            <span
              className="font-roHe"
              style={{
                backgroundColor: `${colorTitle || bgTitle}`,
              }}
            >
              Trò Chơi Hot Nhất
            </span>
          </div>
        )}
        {ListGame.length && (
          <HotTheGame
            listGame={ListGame}
            searchValue={propSearchValue}
            key="hotgame"
            gamename={gameName}
          />
        )}

        {(isLoading || isFetching) && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999]">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, color: "#fff" }}
                  spin
                />
              }
            />
          </div>
        )}
      </div>
    </NavigationGameComponent>
  );
}
