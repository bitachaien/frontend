"use client";

import styles from "./Auth.module.css";
import { buildAssetUrl } from "@/config/assets";
import Image from "next/image";

interface AuthIllustrationProps {
  image: string;
  title: string;
  subtitle: string;
  badge?: {
    label: string;
    icon?: string;
  };
}

const AuthIllustration = ({ image, title, subtitle, badge }: AuthIllustrationProps) => {
  const backgroundUrl = buildAssetUrl(image);

  return (
    <aside
      className={styles.illustration}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.overlayContent}>
        {badge ? (
          <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {badge.icon ? (
              <Image src={buildAssetUrl(badge.icon)} alt="badge" width={18} height={18} />
            ) : null}
            {badge.label}
          </span>
        ) : null}
        <h2 className={styles.overlayTitle}>{title}</h2>
        <p className={styles.overlaySubtitle}>{subtitle}</p>
      </div>
    </aside>
  );
};

export default AuthIllustration;
