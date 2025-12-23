/**
 * Mock Data cho Development và Testing
 * Dữ liệu giả lập cho các API responses
 */

// ==================== AUTH MOCK DATA ====================

export const mockUser = {
    id: 1,
    username: "testuser",
    name: "Người Dùng Test",
    email: "testuser@example.com",
    phone: "0901234567",
    balance: 5000000,
    currency: "VND",
    avatar: "/images/account/default-avatar.png",
    vipLevel: 3,
    vipPoints: 15000,
    createdAt: "2024-01-15T10:30:00Z",
    status: "active",
    isVerified: true,
    referralCode: "TEST2024",
    withdrawPassword: true,
};

export const mockLoginResponse = {
    status: true,
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE3MDUzMTQwMDAsImV4cCI6MTcwNTQwMDQwMH0.mock_token_signature",
    user: mockUser,
};

export const mockRegisterResponse = {
    status: true,
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE3MDUzMTQwMDAsImV4cCI6MTcwNTQwMDQwMH0.mock_token_signature",
    user: mockUser,
    msg: "Đăng ký thành công!",
};

export const mockLoginError = {
    status: false,
    msg: "Tên đăng nhập hoặc mật khẩu không đúng",
};

export const mockRegisterError = {
    status: false,
    msg: "Tên đăng nhập đã tồn tại",
};

// ==================== USER PROFILE MOCK DATA ====================

export const mockUserProfile = {
    code: 200,
    user: {
        ...mockUser,
        totalDeposit: 50000000,
        totalWithdraw: 45000000,
        totalBet: 150000000,
        totalWin: 148000000,
        lastLoginAt: "2024-12-22T10:00:00Z",
        lastLoginIp: "192.168.1.1",
    },
};

// ==================== WALLET & BALANCE MOCK DATA ====================

export const mockBalance = {
    status: true,
    data: {
        balance: 5000000,
        currency: "VND",
        lockedAmount: 500000,
        availableBalance: 4500000,
    },
};

export const mockTransactionHistory = {
    status: true,
    data: {
        transactions: [
            {
                id: 1,
                type: "deposit",
                amount: 1000000,
                status: "completed",
                method: "bank_transfer",
                createdAt: "2024-12-22T09:30:00Z",
                description: "Nạp tiền qua Vietcombank",
            },
            {
                id: 2,
                type: "withdraw",
                amount: 500000,
                status: "pending",
                method: "bank_transfer",
                createdAt: "2024-12-22T08:15:00Z",
                description: "Rút tiền về Techcombank",
            },
            {
                id: 3,
                type: "bet",
                amount: -100000,
                status: "completed",
                method: "game",
                createdAt: "2024-12-22T07:45:00Z",
                description: "Cá cược Slot - Lucky 88",
            },
            {
                id: 4,
                type: "win",
                amount: 250000,
                status: "completed",
                method: "game",
                createdAt: "2024-12-22T07:50:00Z",
                description: "Thắng cược Slot - Lucky 88",
            },
        ],
        pagination: {
            total: 150,
            page: 1,
            pageSize: 10,
            totalPages: 15,
        },
    },
};

// ==================== GAME MOCK DATA ====================

export const mockGames = {
    status: true,
    data: [
        {
            id: 1,
            name: "Lucky 88",
            nameEn: "Lucky 88",
            provider: "Pragmatic Play",
            category: "slot",
            thumbnail: "/images/games/lucky88.jpg",
            isHot: true,
            isFavorite: false,
            rtp: 96.5,
            minBet: 1000,
            maxBet: 1000000,
        },
        {
            id: 2,
            name: "Rồng Hổ",
            nameEn: "Dragon Tiger",
            provider: "Evolution Gaming",
            category: "casino",
            thumbnail: "/images/games/dragon-tiger.jpg",
            isHot: true,
            isFavorite: true,
            rtp: 97.2,
            minBet: 10000,
            maxBet: 5000000,
        },
        {
            id: 3,
            name: "Baccarat",
            nameEn: "Baccarat",
            provider: "Evolution Gaming",
            category: "casino",
            thumbnail: "/images/games/baccarat.jpg",
            isHot: false,
            isFavorite: false,
            rtp: 98.8,
            minBet: 20000,
            maxBet: 10000000,
        },
        {
            id: 4,
            name: "Cá Vàng",
            nameEn: "Golden Fish",
            provider: "JDB Gaming",
            category: "fishing",
            thumbnail: "/images/games/golden-fish.jpg",
            isHot: true,
            isFavorite: true,
            rtp: 95.5,
            minBet: 5000,
            maxBet: 2000000,
        },
        {
            id: 5,
            name: "Bóng Đá Ảo",
            nameEn: "Virtual Football",
            provider: "Betradar",
            category: "sport",
            thumbnail: "/images/games/virtual-football.jpg",
            isHot: false,
            isFavorite: false,
            rtp: 94.0,
            minBet: 10000,
            maxBet: 1000000,
        },
    ],
    pagination: {
        total: 500,
        page: 1,
        pageSize: 20,
    },
};

export const mockGameProviders = {
    status: true,
    data: [
        { id: 1, name: "Pragmatic Play", logo: "/images/logo-ncc/pragmatic.png", gameCount: 150 },
        { id: 2, name: "Evolution Gaming", logo: "/images/logo-ncc/evolution.png", gameCount: 80 },
        { id: 3, name: "JDB Gaming", logo: "/images/logo-ncc/jdb.png", gameCount: 120 },
        { id: 4, name: "PG Soft", logo: "/images/logo-ncc/pgsoft.png", gameCount: 100 },
        { id: 5, name: "Sexy Gaming", logo: "/images/logo-ncc/sexy.png", gameCount: 50 },
    ],
};

// ==================== PROMOTION MOCK DATA ====================

export const mockPromotions = {
    status: true,
    data: [
        {
            id: 1,
            title: "Thưởng 100% Nạp Đầu",
            description: "Nhận ngay 100% tiền thưởng cho lần nạp đầu tiên, tối đa 5.000.000 VND",
            image: "/images/promotion/welcome-bonus.jpg",
            validFrom: "2024-12-01T00:00:00Z",
            validTo: "2024-12-31T23:59:59Z",
            status: "active",
            category: "deposit",
            minDeposit: 100000,
            maxBonus: 5000000,
            turnover: 20,
        },
        {
            id: 2,
            title: "Hoàn Trả Hàng Tuần",
            description: "Hoàn trả 10% tổng cược thua mỗi tuần, không giới hạn",
            image: "/images/promotion/weekly-cashback.jpg",
            validFrom: "2024-12-01T00:00:00Z",
            validTo: "2024-12-31T23:59:59Z",
            status: "active",
            category: "cashback",
            minBet: 1000000,
            cashbackRate: 10,
            turnover: 1,
        },
        {
            id: 3,
            title: "Giải Đấu Slot",
            description: "Tham gia giải đấu slot với tổng giải thưởng 100.000.000 VND",
            image: "/images/promotion/slot-tournament.jpg",
            validFrom: "2024-12-15T00:00:00Z",
            validTo: "2024-12-25T23:59:59Z",
            status: "active",
            category: "tournament",
            totalPrize: 100000000,
            minBet: 50000,
        },
    ],
    pagination: {
        total: 15,
        page: 1,
        pageSize: 10,
    },
};

// ==================== VIP MOCK DATA ====================

export const mockVipInfo = {
    status: true,
    data: {
        currentLevel: 3,
        currentPoints: 15000,
        nextLevelPoints: 25000,
        progressPercent: 60,
        levels: [
            {
                level: 1,
                name: "Đồng",
                minPoints: 0,
                benefits: {
                    withdrawLimit: 5000000,
                    withdrawFee: 1,
                    birthdayBonus: 100000,
                    monthlyBonus: 0,
                },
            },
            {
                level: 2,
                name: "Bạc",
                minPoints: 5000,
                benefits: {
                    withdrawLimit: 10000000,
                    withdrawFee: 0.5,
                    birthdayBonus: 500000,
                    monthlyBonus: 200000,
                },
            },
            {
                level: 3,
                name: "Vàng",
                minPoints: 15000,
                benefits: {
                    withdrawLimit: 20000000,
                    withdrawFee: 0,
                    birthdayBonus: 1000000,
                    monthlyBonus: 500000,
                },
            },
            {
                level: 4,
                name: "Bạch Kim",
                minPoints: 25000,
                benefits: {
                    withdrawLimit: 50000000,
                    withdrawFee: 0,
                    birthdayBonus: 3000000,
                    monthlyBonus: 1500000,
                },
            },
            {
                level: 5,
                name: "Kim Cương",
                minPoints: 50000,
                benefits: {
                    withdrawLimit: 100000000,
                    withdrawFee: 0,
                    birthdayBonus: 10000000,
                    monthlyBonus: 5000000,
                },
            },
        ],
    },
};

// ==================== FRIEND REFERRAL MOCK DATA ====================

export const mockReferralInfo = {
    status: true,
    data: {
        referralCode: "TEST2024",
        totalReferrals: 15,
        activeReferrals: 12,
        totalCommission: 3500000,
        pendingCommission: 250000,
        referralLink: "https://789be89.com/register?refcode=TEST2024",
        commissionRate: 0.5,
        referrals: [
            {
                id: 1,
                username: "user***1",
                joinedAt: "2024-12-01T10:00:00Z",
                totalBet: 5000000,
                commission: 250000,
                status: "active",
            },
            {
                id: 2,
                username: "user***2",
                joinedAt: "2024-12-05T14:30:00Z",
                totalBet: 3000000,
                commission: 150000,
                status: "active",
            },
            {
                id: 3,
                username: "user***3",
                joinedAt: "2024-12-10T09:15:00Z",
                totalBet: 8000000,
                commission: 400000,
                status: "active",
            },
        ],
    },
};

// ==================== BANK & PAYMENT MOCK DATA ====================

export const mockBankList = {
    status: true,
    data: [
        { code: "VCB", name: "Vietcombank", logo: "/images/Bank/vcb.png" },
        { code: "TCB", name: "Techcombank", logo: "/images/Bank/tcb.png" },
        { code: "MB", name: "MBBank", logo: "/images/Bank/mb.png" },
        { code: "VTB", name: "Vietinbank", logo: "/images/Bank/vtb.png" },
        { code: "ACB", name: "ACB", logo: "/images/Bank/acb.png" },
        { code: "BIDV", name: "BIDV", logo: "/images/Bank/bidv.png" },
        { code: "TPB", name: "TPBank", logo: "/images/Bank/tpb.png" },
        { code: "VPB", name: "VPBank", logo: "/images/Bank/vpb.png" },
    ],
};

export const mockUserBankAccounts = {
    status: true,
    data: [
        {
            id: 1,
            bankCode: "VCB",
            bankName: "Vietcombank",
            accountNumber: "1234567890",
            accountName: "NGUYEN VAN A",
            isDefault: true,
        },
        {
            id: 2,
            bankCode: "TCB",
            bankName: "Techcombank",
            accountNumber: "9876543210",
            accountName: "NGUYEN VAN A",
            isDefault: false,
        },
    ],
};

export const mockDepositMethods = {
    status: true,
    data: [
        {
            id: 1,
            method: "bank_transfer",
            name: "Chuyển khoản ngân hàng",
            icon: "/images/icons-bank/bank-transfer.png",
            minAmount: 100000,
            maxAmount: 50000000,
            processingTime: "1-5 phút",
            fee: 0,
            isAvailable: true,
        },
        {
            id: 2,
            method: "momo",
            name: "Ví MoMo",
            icon: "/images/icons-bank/momo.png",
            minAmount: 100000,
            maxAmount: 20000000,
            processingTime: "Tức thì",
            fee: 0,
            isAvailable: true,
        },
        {
            id: 3,
            method: "zalopay",
            name: "Ví ZaloPay",
            icon: "/images/icons-bank/zalopay.png",
            minAmount: 100000,
            maxAmount: 20000000,
            processingTime: "Tức thì",
            fee: 0,
            isAvailable: true,
        },
    ],
};

// ==================== NOTIFICATION MOCK DATA ====================

export const mockNotifications = {
    status: true,
    data: [
        {
            id: 1,
            title: "Chúc mừng nạp tiền thành công",
            message: "Bạn đã nạp thành công 1.000.000 VND vào tài khoản",
            type: "success",
            isRead: false,
            createdAt: "2024-12-22T09:30:00Z",
        },
        {
            id: 2,
            title: "Khuyến mãi mới",
            message: "Chương trình hoàn trả 10% đang diễn ra, tham gia ngay!",
            type: "promotion",
            isRead: false,
            createdAt: "2024-12-22T08:00:00Z",
        },
        {
            id: 3,
            title: "Yêu cầu rút tiền đang xử lý",
            message: "Yêu cầu rút 500.000 VND đang được xử lý",
            type: "info",
            isRead: true,
            createdAt: "2024-12-22T07:15:00Z",
        },
    ],
    unreadCount: 2,
};

// ==================== PORTAL CONFIG MOCK DATA ====================

export const mockPortalConfig = {
    TitleName: "789BE89",
    PortalSiteName: "789be89.com",
    WebsiteName: "789BE89 - Nhà Cái Uy Tín Hàng Đầu",
    Currency: "VND",
    DefaultLanguage: "vi",
    MemberPhoneActivation: false,
    IsMustLogin: false,
    HasFranchisee: true,
    EnableSmsPasswordForget: true,
    Contact1: "support@789be89.com",
    Contact2: "+84 123 456 789",
    EnableVip: true,
    EnableSmsWithdrawPassword: true,
    EnableFriendReferral: true,
    EnableLeaderboard: true,
    RememberMeType: 1,
    EnableLeaderboardGameHallDistribution: true,
    EnableLeaderboardHighRoller: true,
    IsShowCountryCode: true,
};
