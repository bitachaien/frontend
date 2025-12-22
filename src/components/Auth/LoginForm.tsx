"use client";

import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { openNotification } from "@/utils/check";
import authService from "@/api/services/auth.servicer";
import { useUser } from "@/context/useUserContext";
import styles from "./Auth.module.css";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response: any = await authService.signin(
        values.username.trim(),
        values.password.trim()
      );

      if (response?.status === true && response?.access_token) {
        loginUser(response.user || response.data || {}, response.access_token);
        openNotification({ type: "success", message: "Đăng nhập thành công" });

        const redirectUrl = searchParams.get("callbackUrl") || "/";
        router.push(redirectUrl);
        return;
      }
          <span className={styles.inlineLink} onClick={() => router.push("/cskh")}>
            Quên mật khẩu?
          </span>
        message: response?.msg || "Đăng nhập thất bại, vui lòng thử lại",
      });
    } catch (error: any) {
      const errorMessage = error?.msg || error?.message || "Đăng nhập thất bại";
      openNotification({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.formSection}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Chào mừng trở lại</h1>
        <p className={styles.formSubtitle}>
          Đăng nhập để trải nghiệm kho trò chơi và ưu đãi độc quyền.
        </p>
      </header>

      <Form
        form={form}
        layout="vertical"
        className={styles.formContainer}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          className={styles.inputField}
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input size="large" placeholder="Tên đăng nhập" autoComplete="username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          className={styles.inputField}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password
            size="large"
            placeholder="Mật khẩu"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className={styles.inlineActions}>
          <span className={styles.inlineLink} onClick={() => router.push("/forgot-password")}>Quên mật khẩu?</span>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={isLoading}
          className={styles.primaryButton}
        >
          Đăng nhập
        </Button>
      </Form>

      <div className={styles.statusMessage}>
        Bảo mật tuyệt đối: Không chia sẻ thông tin tài khoản, mật khẩu cho bất kỳ ai. Chúng tôi không bao giờ yêu cầu cung cấp mã OTP qua tin nhắn hoặc cuộc gọi.
      </div>

      <div className={styles.secondaryAction}>
        Chưa có tài khoản? {" "}
        <button
          type="button"
          onClick={() => {
            const callback = searchParams.get("callbackUrl");
            const href = callback
              ? `/auth/register?callbackUrl=${encodeURIComponent(callback)}`
              : "/auth/register";
            router.push(href);
          }}
        >
          Đăng ký ngay
        </button>
      </div>
    </section>
  );
};

export default LoginForm;
