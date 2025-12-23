/**
 * Mock Initializer Component
 * Khởi tạo mock adapters khi component mount
 */

"use client";

import { useEffect, useState } from "react";
import { initializeMocks, isMockEnabled, MOCK_CREDENTIALS, TEST_ACCOUNTS } from "@/mocks";

export default function MockInitializer() {
    const [mockStatus, setMockStatus] = useState<"checking" | "enabled" | "disabled">("checking");

    useEffect(() => {
        // Chỉ chạy ở client side
        if (typeof window !== "undefined") {
            try {
                initializeMocks();
                setMockStatus(isMockEnabled() ? "enabled" : "disabled");
            } catch (error) {
                console.error("Failed to initialize mocks:", error);
                setMockStatus("disabled");
            }
        }
    }, []);

    // Hiển thị mock status banner trong development mode
    if (process.env.NODE_ENV !== "development" || mockStatus !== "enabled") {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "8px 16px",
                zIndex: 99999,
                fontSize: "12px",
                fontFamily: "monospace",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>🔧</span>
                <span>
                    <strong>MOCK MODE</strong> - Sử dụng dữ liệu giả lập
                </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <span>
                    Test Login: <strong>{MOCK_CREDENTIALS.username}</strong> / <strong>{MOCK_CREDENTIALS.password}</strong>
                </span>
                <button
                    onClick={() => {
                        const accountsInfo = TEST_ACCOUNTS.map(
                            (acc) => `${acc.username} / ${acc.password}\n→ ${acc.description}`
                        ).join("\n\n");
                        alert(`Test Accounts:\n\n${accountsInfo}`);
                    }}
                    style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "11px",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    }}
                >
                    Xem tất cả test accounts
                </button>
            </div>
        </div>
    );
}
