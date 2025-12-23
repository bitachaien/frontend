/**
 * Mock Service - Enable/Disable mock mode
 * Cấu hình mock cho development
 */

import { authInstance, contentInstance } from "@/configs/CustomizeAxios";
import { setupAuthMock, setupContentMock } from "./mockAdapter";
import type MockAdapter from "axios-mock-adapter";

// Flag để bật/tắt mock mode
const ENABLE_MOCK =
    process.env.NEXT_PUBLIC_ENABLE_MOCK === "true" ||
    process.env.NODE_ENV === "development";

let authMock: MockAdapter | null = null;
let contentMock: MockAdapter | null = null;

/**
 * Initialize mock adapters
 * Gọi hàm này ở app startup để enable mock
 */
export const initializeMocks = () => {
    if (!ENABLE_MOCK) {
        console.log("Mock mode is disabled");
        return;
    }

    try {
        // Setup mock cho auth instance
        authMock = setupAuthMock(authInstance);
        console.log("✅ Auth mock initialized");

        // Setup mock cho content instance
        contentMock = setupContentMock(contentInstance);
        console.log("✅ Content mock initialized");

        console.log(
            "🔧 Mock mode is ENABLED - Using mock data for API calls"
        );
        console.log("Test credentials: username=testuser, password=123456");
    } catch (error) {
        console.error("Failed to initialize mocks:", error);
    }
};

/**
 * Disable mock adapters và restore axios thực
 */
export const disableMocks = () => {
    if (authMock) {
        authMock.restore();
        authMock = null;
        console.log("Auth mock disabled");
    }

    if (contentMock) {
        contentMock.restore();
        contentMock = null;
        console.log("Content mock disabled");
    }

    console.log("Mock mode disabled - Using real API");
};

/**
 * Check if mock mode is enabled
 */
export const isMockEnabled = () => {
    return ENABLE_MOCK && (authMock !== null || contentMock !== null);
};

/**
 * Thông tin mock credentials cho testing
 */
export const MOCK_CREDENTIALS = {
    username: "testuser",
    password: "123456",
    email: "testuser@example.com",
    phone: "0901234567",
};

/**
 * Thông tin test accounts
 */
export const TEST_ACCOUNTS = [
    {
        username: "testuser",
        password: "123456",
        description: "Tài khoản test thành công",
    },
    {
        username: "wronguser",
        password: "wrongpass",
        description: "Tài khoản test đăng nhập thất bại",
    },
    {
        username: "existinguser",
        password: "123456",
        description: "Tài khoản test đăng ký thất bại (username đã tồn tại)",
    },
];

export default {
    initializeMocks,
    disableMocks,
    isMockEnabled,
    MOCK_CREDENTIALS,
    TEST_ACCOUNTS,
};
