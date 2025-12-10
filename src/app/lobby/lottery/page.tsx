"use client";
import styles from "./lottery.module.css";
import MarqueeDesktop from "@/components/MarqueeDesktop";
import useLaunchGameDevice from "@/hooks/useLaunchGameDevice";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/useUserContext";
import gameService from "@/api/services/game.service";
import Image from "next/image";
import { usePlayGame } from "@/hooks/usePlayGame";

const defaultGameLottery = [
  {
    icon: "https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/gw.png",
    link: "portfolio=SeamlessGame&gameid=1&gpid=1049",
    type: "LobbyType2",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/vr.png",
    link: "portfolio=SeamlessGame&gameid=4&gpid=1049",
    type: "LobbyType2",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/tp.png",
    link: "portfolio=SeamlessGame&gameid=5&gpid=1049",
    type: "LobbyType2",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/sw.png",
    link: "portfolio=SeamlessGame&gameid=3&gpid=1049",
    type: "LobbyType2",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/tgc.png",
    link: "portfolio=SeamlessGame&gameid=3&gpid=1012",
    type: "LobbyType2",
  },
];

export default function Lottery() {
  const deviceC = useLaunchGameDevice();
  const router = useRouter();

  const { user } = useUser();
  const { playGame } = usePlayGame();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <div className="h-[280px] mb-[-30px] w-full">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          loading="lazy"
          className="h-full bg-cover w-full"
          src="https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/banner.png"
          alt=""
        />
      </div>
      <MarqueeDesktop />

      <div className={styles.bg}>
        <div
          className={` max-w-[1200px] h-auto pt-[30px] px-5 pb-10 grid grid-cols-1 md:grid-cols-4 gap-3`}>
          {defaultGameLottery.map((item: any) => {
            const handleClick = async () => {
              const urlParams = new URLSearchParams(item.link);
              const portfolio = urlParams.get("portfolio") || "";
              const gameid = urlParams.get("gameid") || "";
              const gpid = urlParams.get("gpid") || "";
              await playGame({
                gameId: gameid || 0,
                gpid: gpid || 0,
                supplier: portfolio || "fe",
                type: item.gameTypeId || 0,
                lang: "en",
              });
            };
            return (
              <div className={styles.itemGame} key={item.link}>
                <Image
                  width={282}
                  height={359}
                  sizes="100vw"
                  src={item.icon}
                  alt=""
                />
                <div onClick={handleClick} className={styles.btn}>
                  Cược ngay
                </div>
              </div>
            );
          })}
          <div className={styles.itemGame}>
            <Image
              width={282}
              height={359}
              sizes="100vw"
              src="https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/update.png"
              alt=""
            />
          </div>
          <div className={styles.itemGame}>
            <Image
              width={282}
              height={359}
              sizes="100vw"
              src="https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/update.png"
              alt=""
            />
          </div>
          <div className={styles.itemGame}>
            <Image
              width={282}
              height={359}
              sizes="100vw"
              src="https://cdn.jsdelivr.net/gh/snail5555/akv@main/789bet/images/xoso/update.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
