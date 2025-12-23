/**
 * Mock Adapter - Intercept axios requests và trả về mock data
 * Sử dụng cho development và testing
 */

import MockAdapter from "axios-mock-adapter";
import { AxiosInstance } from "axios";
import * as mockData from "./mockData";

// Delay để giả lập network latency
const MOCK_DELAY = 500;

/**
 * Setup mock adapter cho auth instance
 */
export const setupAuthMock = (instance: AxiosInstance) => {
    const mock = new MockAdapter(instance, { delayResponse: MOCK_DELAY });

    // Mock login endpoint
    mock.onPost("/auth/login").reply((config) => {
        const { username, password } = JSON.parse(config.data || "{}");

        // Simulate success login
        if (username === "testuser" && password === "123456") {
            return [200, mockData.mockLoginResponse];
        }

        // Simulate wrong credentials
        return [200, mockData.mockLoginError];
    });

    // Mock register endpoint
    mock.onPost("/auth/register").reply((config) => {
        const data = JSON.parse(config.data || "{}");

        // Simulate existing username
        if (data.username === "existinguser") {
            return [200, mockData.mockRegisterError];
        }

        // Simulate success registration
        return [200, mockData.mockRegisterResponse];
    });

    return mock;
};

/**
 * Setup mock adapter cho content instance
 */
export const setupContentMock = (instance: AxiosInstance) => {
    const mock = new MockAdapter(instance, { delayResponse: MOCK_DELAY });

    // ==================== USER & PROFILE ====================

    // Mock get user profile (me)
    mock.onGet(/\/api\/auth\/me/).reply(200, mockData.mockUserProfile);

    // Mock update user info
    mock.onPost(/\/api\/auth\/update/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                msg: "Cập nhật thông tin thành công",
                user: { ...mockData.mockUser, ...data },
            },
        ];
    });

    // Mock change password
    mock.onPost(/\/api\/auth\/change-password/).reply(200, {
        status: true,
        msg: "Đổi mật khẩu thành công",
    });

    // ==================== WALLET & BALANCE ====================

    // Mock get balance
    mock.onGet(/\/api\/wallet\/balance/).reply(200, mockData.mockBalance);

    // Mock transaction history
    mock.onGet(/\/api\/wallet\/transactions/).reply(200, mockData.mockTransactionHistory);

    // Mock deposit request
    mock.onPost(/\/api\/wallet\/deposit/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                msg: "Yêu cầu nạp tiền đã được ghi nhận",
                data: {
                    transactionId: `DEP${Date.now()}`,
                    amount: data.amount,
                    status: "pending",
                },
            },
        ];
    });

    // Mock withdraw request
    mock.onPost(/\/api\/wallet\/withdraw/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                msg: "Yêu cầu rút tiền đã được ghi nhận",
                data: {
                    transactionId: `WD${Date.now()}`,
                    amount: data.amount,
                    status: "pending",
                },
            },
        ];
    });

    // ==================== GAMES ====================

    // Mock game list
    mock.onGet(/\/api\/games/).reply((config) => {
        const params = config.params || {};
        const category = params.category;
        const provider = params.provider;

        let games = mockData.mockGames.data;

        // Filter by category
        if (category) {
            games = games.filter((game) => game.category === category);
        }

        // Filter by provider
        if (provider) {
            games = games.filter((game) => game.provider === provider);
        }

        return [
            200,
            {
                status: true,
                data: games,
                pagination: mockData.mockGames.pagination,
            },
        ];
    });

    // Mock game providers
    mock.onGet(/\/api\/games\/providers/).reply(200, mockData.mockGameProviders);

    // Mock launch game
    mock.onPost(/\/api\/games\/launch/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                data: {
                    gameUrl: `https://demo.game-provider.com/play?gameId=${data.gameId}&token=mock_game_token`,
                },
            },
        ];
    });

    // Mock favorite game
    mock.onPost(/\/api\/games\/favorite/).reply(200, {
        status: true,
        msg: "Đã thêm vào yêu thích",
    });

    // ==================== PROMOTIONS ====================

    // Mock promotions list
    mock.onGet(/\/api\/promotions/).reply(200, mockData.mockPromotions);

    // Mock promotion detail
    mock.onGet(/\/api\/promotions\/\d+/).reply((config) => {
        const promotion = mockData.mockPromotions.data[0];
        return [200, { status: true, data: promotion }];
    });

    // Mock claim promotion
    mock.onPost(/\/api\/promotions\/claim/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                msg: "Nhận khuyến mãi thành công",
                data: {
                    promotionId: data.promotionId,
                    bonusAmount: 500000,
                },
            },
        ];
    });

    // ==================== VIP ====================

    // Mock VIP info
    mock.onGet(/\/api\/vip/).reply(200, mockData.mockVipInfo);

    // Mock VIP rewards
    mock.onPost(/\/api\/vip\/claim-reward/).reply(200, {
        status: true,
        msg: "Nhận thưởng VIP thành công",
        data: {
            rewardAmount: 500000,
        },
    });

    // ==================== FRIEND REFERRAL ====================

    // Mock referral info
    mock.onGet(/\/api\/referral/).reply(200, mockData.mockReferralInfo);

    // Mock referral history
    mock.onGet(/\/api\/referral\/history/).reply(200, mockData.mockReferralInfo);

    // ==================== BANK & PAYMENT ====================

    // Mock bank list
    mock.onGet(/\/api\/payment\/banks/).reply(200, mockData.mockBankList);

    // Mock user bank accounts
    mock.onGet(/\/api\/payment\/user-banks/).reply(200, mockData.mockUserBankAccounts);

    // Mock add bank account
    mock.onPost(/\/api\/payment\/add-bank/).reply((config) => {
        const data = JSON.parse(config.data || "{}");
        return [
            200,
            {
                status: true,
                msg: "Thêm tài khoản ngân hàng thành công",
                data: {
                    id: Date.now(),
                    ...data,
                },
            },
        ];
    });

    // Mock deposit methods
    mock.onGet(/\/api\/payment\/deposit-methods/).reply(200, mockData.mockDepositMethods);

    // ==================== NOTIFICATIONS ====================

    // Mock notifications list
    mock.onGet(/\/api\/notifications/).reply(200, mockData.mockNotifications);

    // Mock mark notification as read
    mock.onPost(/\/api\/notifications\/\d+\/read/).reply(200, {
        status: true,
        msg: "Đã đánh dấu đã đọc",
    });

    // ==================== PORTAL CONFIG ====================

    // Mock portal config
    mock.onGet(/\/api\/portal\/config/).reply(200, mockData.mockPortalConfig);

    return mock;
};

/**
 * Reset tất cả mock adapters
 */
export const resetAllMocks = (mocks: MockAdapter[]) => {
    mocks.forEach((mock) => mock.reset());
};

/**
 * Restore tất cả mock adapters về axios thực
 */
export const restoreAllMocks = (mocks: MockAdapter[]) => {
    mocks.forEach((mock) => mock.restore());
};
