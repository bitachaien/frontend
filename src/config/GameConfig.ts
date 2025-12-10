/**
 * Game Configuration - Tương tự BC88BET
 * Map các game providers với wallet system
 */

export interface GameConfigItem {
  code: string;          // Mã nhà cung cấp (VD: "PG", "JL", "DG")
  config: string;         // Config API
  type: number;           // Product Code thực tế cho wallet transfer (BC88BET style - số lớn như 27, 86, 112)
  gameType?: number;      // GameType enum (SLOT=1, LIVE_CASINO=2, SPORT_BOOK=3) - dùng cho UI
  game: string;           // Tên game
  name: string;           // Tên hiển thị
  mode: number;          // Chế độ
  supplier?: string;      // Supplier name (từ 789BET - partnerName)
  gpid?: number | string; // Provider ID (từ 789BET - providerId)
}

/**
 * GameConfig - Danh sách cấu hình các nhà cung cấp game
 * 
 * Lưu ý:
 * - type: Map với GameType từ 789BET (SLOT=1, LIVE_CASINO=2, etc.)
 * - supplier: Map với partnerName từ game data
 * - gpid: Map với providerId từ game data
 * - code: Mã riêng cho wallet system (có thể giống supplier hoặc khác)
 */
export const GameConfig: GameConfigItem[] = [
  // PG Soft
  {
    code: "PG",
    config: "pg",
    type: 98,             // Product Code từ BC88BET (PG Điện Tử)
    gameType: 1,          // SLOT
    game: "PG",
    name: "PG Soft",
    mode: 1,
    supplier: "pg",
    gpid: 1007,
  },
  // Jili
  {
    code: "JL",
    config: "jili",
    type: 140,            // Product Code từ BC88BET (JL Nổ hũ, Bắn Cá)
    gameType: 1,         // SLOT
    game: "Jili",
    name: "Jili Games",
    mode: 1,
    supplier: "jili",
    gpid: 1091,
  },
  // Dream Gaming
  {
    code: "DG",
    config: "dg",
    type: 27,             // Product Code từ BC88BET (DG Casino)
    gameType: 2,         // LIVE_CASINO
    game: "DG",
    name: "Dream Gaming",
    mode: 1,
    supplier: "dg",
    gpid: 1052,
  },
  // WM Casino
  {
    code: "WM",
    config: "wm",
    type: 118,            // Product Code từ BC88BET (WM CASINO)
    gameType: 2,         // LIVE_CASINO
    game: "WM",
    name: "WM Casino",
    mode: 1,
    supplier: "wm",
    gpid: 1020,
  },
  // SABA Sports
  {
    code: "SB",           // BC88BET dùng "SB" làm code
    config: "saba",
    type: 174,           // Product Code từ BC88BET (SaBa Thể Thao)
    gameType: 3,         // SPORT_BOOK
    game: "SABA",
    name: "SABA Sports",
    mode: 1,
    supplier: "saba",
    gpid: 1046,
  },
  // CMD Sports
  {
    code: "CMD",
    config: "cmd",
    type: 104,           // Product Code từ BC88BET (CMD Thể Thao)
    gameType: 3,        // SPORT_BOOK
    game: "CMD",
    name: "CMD Sports",
    mode: 1,
    supplier: "cmd",
    gpid: 1078,
  },
  // Evolution Gaming
  {
    code: "SA",           // BC88BET dùng "SA" làm code cho EVO
    config: "evo",
    type: 86,            // Product Code từ BC88BET (EVO Casino)
    gameType: 2,        // LIVE_CASINO
    game: "EVO",
    name: "Evolution Gaming",
    mode: 1,
    supplier: "evo",
    gpid: 1002,
  },
  // Pragmatic Play
  {
    code: "PP",
    config: "pp",
    type: 39,            // Product Code từ BC88BET (Pragmatic Play)
    gameType: 1,        // SLOT
    game: "PP",
    name: "Pragmatic Play",
    mode: 1,
    supplier: "pp",
    gpid: 1006,
  },
  // CQ9
  {
    code: "CQ9",
    config: "cq9",
    type: 16,             // Product Code từ BC88BET (CQ9 Nổ hũ, Bắn Cá)
    gameType: 1,         // SLOT
    game: "CQ9",
    name: "CQ9",
    mode: 1,
    supplier: "cq9",
    gpid: 1009,
  },
  // JDB
  {
    code: "JDB",
    config: "jdb",
    type: 55,            // Product Code từ BC88BET (JDB Điện Tử)
    gameType: 1,        // SLOT
    game: "JDB",
    name: "JDB",
    mode: 1,
    supplier: "jdb",
    gpid: 1085,
  },
  // FTG
  {
    code: "FTG",
    config: "ftg",
    type: 147,          // Product Code từ BC88BET (FunTa Gaming)
    gameType: 1,        // SLOT
    game: "FTG",
    name: "FTG",
    mode: 1,
    supplier: "ftg",
    gpid: "FTG",
  },
  // TP (Tiger Play) - Không có trong bc88bet, giữ nguyên
  {
    code: "TP",
    config: "tp",
    type: 1,             // Tạm thời, cần cập nhật khi có Product Code
    gameType: 1,        // SLOT
    game: "TP",
    name: "Tiger Play",
    mode: 1,
    supplier: "tp",
    gpid: "TP",
  },
  // V8
  {
    code: "V8",
    config: "v8",
    type: 102,          // Product Code từ BC88BET (V8 Game 3D - LCC)
    gameType: 1,        // SLOT
    game: "V8",
    name: "V8",
    mode: 1,
    supplier: "v8",
    gpid: "V8",
  },
  // R88
  {
    code: "R88",
    config: "r88",
    type: 162,          // Product Code từ BC88BET (R88 Điện Tử)
    gameType: 1,        // SLOT
    game: "R88",
    name: "R88",
    mode: 1,
    supplier: "r88",
    gpid: "R8",
  },
  // Microgaming
  {
    code: "MG",
    config: "mg",
    type: 43,           // Product Code từ BC88BET (Micro Gaming)
    gameType: 1,        // SLOT
    game: "MG",
    name: "Microgaming",
    mode: 1,
    supplier: "mg",
    gpid: "MP",
  },
  // RTG (RealTime Gaming)
  {
    code: "RTG",
    config: "rtg",
    type: 1,              // SLOT
    game: "RTG",
    name: "RealTime Gaming",
    mode: 1,
    supplier: "rtg",
    gpid: 11,
  },
  // YGR (YesGetRich)
  {
    code: "YGR",
    config: "ygr",
    type: 1,              // SLOT
    game: "YGR",
    name: "YesGetRich",
    mode: 1,
    supplier: "ygr",
    gpid: 1010,
  },
  // KM (KingMidas)
  {
    code: "KM",
    config: "km",
    type: 1,              // SLOT
    game: "KM",
    name: "KingMidas",
    mode: 1,
    supplier: "km",
    gpid: "RE",
  },
  // Live22
  {
    code: "LIVE22",
    config: "live22",
    type: 1,              // SLOT
    game: "LIVE22",
    name: "Live22",
    mode: 1,
    supplier: "live22",
    gpid: 1150,
  },
  // Asia Gaming
  {
    code: "AG",
    config: "ag",
    type: 4,             // Product Code từ BC88BET (AG Casino)
    gameType: 2,        // LIVE_CASINO
    game: "AG",
    name: "Asia Gaming",
    mode: 1,
    supplier: "ag",
    gpid: 1001,
  },
  // Sexy Gaming
  {
    code: "SEX",          // BC88BET dùng "SEX" làm code
    config: "se",
    type: 112,          // Product Code từ BC88BET (SEX Casino)
    gameType: 2,        // LIVE_CASINO
    game: "SE",
    name: "Sexy Gaming",
    mode: 1,
    supplier: "se",
    gpid: 1022,
  },
  // SBO
  {
    code: "SBO",
    config: "sbo",
    type: 54,           // Product Code từ BC88BET (SBOBET)
    gameType: 3,       // SPORT_BOOK
    game: "SBO",
    name: "SBO",
    mode: 1,
    supplier: "sbo",
    gpid: 1012,
  },
  // ... Thêm các providers khác khi cần
];

/**
 * Helper function: Tìm GameConfig theo supplier hoặc code
 */
export const findGameConfigBySupplier = (supplier: string): GameConfigItem | null => {
  return GameConfig.find(
    (item) =>
      item.supplier?.toLowerCase() === supplier.toLowerCase() ||
      item.code.toLowerCase() === supplier.toLowerCase()
  ) || null;
};

/**
 * Helper function: Tìm GameConfig theo code
 */
export const findGameConfigByCode = (code: string): GameConfigItem | null => {
  return GameConfig.find(
    (item) => item.code.toLowerCase() === code.toLowerCase()
  ) || null;
};

/**
 * Helper function: Tìm GameConfig theo gpid
 */
export const findGameConfigByGpid = (gpid: number | string): GameConfigItem | null => {
  return GameConfig.find(
    (item) => String(item.gpid) === String(gpid)
  ) || null;
};

