/**
 * Demo Page - Test Mock Data
 * Trang demo để test các mock APIs
 */

"use client";

import { useState } from "react";
import { Button, Card, Space, Typography, Divider, Alert } from "antd";
import authService from "@/api/services/auth.servicer";
import { MOCK_CREDENTIALS } from "@/mocks";

const { Title, Text, Paragraph } = Typography;

export default function MockDemoPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string>("");

    const testLogin = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await authService.signin(
                MOCK_CREDENTIALS.username,
                MOCK_CREDENTIALS.password
            );
            setResult(response);
        } catch (err: any) {
            setError(err?.msg || err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const testLoginFail = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await authService.signin("wronguser", "wrongpass");
            setResult(response);
        } catch (err: any) {
            setError(err?.msg || err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const testRegister = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await authService.signupUser(
                "Test User",
                "newuser" + Date.now(),
                "123456",
                "test@example.com",
                "0901234567"
            );
            setResult(response);
        } catch (err: any) {
            setError(err?.msg || err?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    const testRegisterFail = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await authService.signupUser(
                "Existing User",
                "existinguser",
                "123456",
                "existing@example.com",
                "0901234567"
            );
            setResult(response);
        } catch (err: any) {
            setError(err?.msg || err?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
            <Title level={2}>🧪 Mock Data Demo & Testing</Title>
            <Paragraph>
                Trang này để test các mock APIs. Mock mode phải được bật trong .env.local:
                <br />
                <code>NEXT_PUBLIC_ENABLE_MOCK=true</code>
            </Paragraph>

            <Divider />

            <Title level={4}>Test Login & Register</Title>

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Card title="Test Đăng Nhập">
                    <Space wrap>
                        <Button type="primary" onClick={testLogin} loading={loading}>
                            ✅ Login Success (testuser/123456)
                        </Button>
                        <Button danger onClick={testLoginFail} loading={loading}>
                            ❌ Login Fail (wronguser/wrongpass)
                        </Button>
                    </Space>
                </Card>

                <Card title="Test Đăng Ký">
                    <Space wrap>
                        <Button type="primary" onClick={testRegister} loading={loading}>
                            ✅ Register Success (random username)
                        </Button>
                        <Button danger onClick={testRegisterFail} loading={loading}>
                            ❌ Register Fail (existinguser)
                        </Button>
                    </Space>
                </Card>

                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError("")}
                    />
                )}

                {result && (
                    <Card title="Response Result" style={{ backgroundColor: "#f0f2f5" }}>
                        <pre style={{ overflow: "auto", maxHeight: "400px" }}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </Card>
                )}
            </Space>

            <Divider />

            <Title level={4}>📚 Mock Credentials</Title>
            <Card>
                <Space direction="vertical">
                    <div>
                        <Text strong>Success Login:</Text>
                        <br />
                        Username: <code>{MOCK_CREDENTIALS.username}</code>
                        <br />
                        Password: <code>{MOCK_CREDENTIALS.password}</code>
                    </div>
                    <div>
                        <Text strong>Failed Login:</Text>
                        <br />
                        Username: <code>wronguser</code>
                        <br />
                        Password: <code>wrongpass</code>
                    </div>
                    <div>
                        <Text strong>Failed Register (existing):</Text>
                        <br />
                        Username: <code>existinguser</code>
                    </div>
                </Space>
            </Card>

            <Divider />

            <Alert
                message="Lưu ý"
                description={
                    <>
                        <ul>
                            <li>Mock mode chỉ hoạt động khi NEXT_PUBLIC_ENABLE_MOCK=true</li>
                            <li>Tất cả responses có delay 500ms để giả lập network</li>
                            <li>Mock data reset mỗi khi refresh page</li>
                            <li>Xem console logs để debug mock interceptors</li>
                        </ul>
                    </>
                }
                type="info"
                showIcon
            />
        </div>
    );
}
