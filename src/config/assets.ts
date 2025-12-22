const normalize = (base: string) => base.replace(/\/$/, "");

const DEFAULT_ASSET_BASE = "https://789be89.com";

export const ASSET_BASE_URL = normalize(
  process.env.NEXT_PUBLIC_ASSET_BASE_URL || DEFAULT_ASSET_BASE
);

export const buildAssetUrl = (path: string): string => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (path.startsWith("/")) {
    return path;
  }

  const trimmedPath = path.replace(/^\/+/, "");
  return `${ASSET_BASE_URL}/${trimmedPath}`;
};
