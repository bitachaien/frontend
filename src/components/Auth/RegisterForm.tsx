"use client";

import { Button, Form, Input, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import apiClient from "@/api/apiClient";
import authService from "@/api/services/auth.servicer";
import { ConfigCapchaEndPoint } from "@/api/services/contants";
import { capcha, capchaKey } from "@/constant";
import { openNotification } from "@/utils/check";
import { useUser } from "@/context/useUserContext";
import styles from "./Auth.module.css";

interface RegisterFormValues {
  name?: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  email?: string;
  referral?: string;
  captchaText: string;
  captchaKey: string;
}

const RegisterForm = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState<{ key: string; svg: string } | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const { loginUser } = useUser();

  const fetchCaptcha = useCallback(async () => {
    if (isCaptchaLoading) {
      return;
    }

    setIsCaptchaLoading(true);
    try {
      const response: any = await apiClient.post({ url: ConfigCapchaEndPoint.REG });
      const payload = response?.data?.data || response?.data;
      const key: string | undefined = payload?.key;
      const svg: string | undefined = payload?.svg;

      if (!key || !svg) {
        throw new Error("Captcha payload invalid");
      }

      setCaptcha({ key, svg });
      form.setFieldsValue({ captchaKey: key, captchaText: "" });
    } catch (error) {
      setCaptcha({ key: capchaKey, svg: capcha });
      form.setFieldsValue({ captchaKey: capchaKey, captchaText: "" });
    } finally {
      setIsCaptchaLoading(false);
    }
  }, [form, isCaptchaLoading]);

  useEffect(() => {
    void fetchCaptcha();
  }, [fetchCaptcha]);

  const handleRefreshCaptcha = () => {
    if (isCaptchaLoading) {
      return;
    }
    void fetchCaptcha();
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    if (!values.captchaKey || !values.captchaText?.trim()) {
      openNotification({ type: "error", message: "Vui lòng nhập mã bảo mật" });
      void fetchCaptcha();
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: values.name?.trim() || values.username.trim().toUpperCase(),
        username: values.username.trim(),
        password: values.password.trim(),
        phone: values.phone.trim(),
        email: values.email?.trim() || `${values.username.trim()}@member.789`,
        referral: values.referral?.trim() || null,
        captcha: {
          captchaKey: values.captchaKey,
          captchaText: values.captchaText.trim(),
        },
      };

      const response: any = payload.referral
        ? await authService.signupUserRe(
          payload.name,
          payload.username,
          payload.password,
          payload.email,
          payload.phone,
          payload.referral,
          payload.captcha
        )
        : await authService.signupUser(
          payload.name,
          payload.username,
          payload.password,
          payload.email,
          payload.phone,
          payload.captcha
        );

      if (response?.status === true && response?.access_token) {
        loginUser(response.user || response.data || {}, response.access_token);
        openNotification({ type: "success", message: "Đăng ký thành công" });
        const redirectUrl = searchParams.get("callbackUrl") || "/";
        router.push(redirectUrl);
        return;
      }

      openNotification({
        type: "error",
        message: response?.msg || "Đăng ký thất bại, vui lòng kiểm tra lại thông tin",
      });
      void fetchCaptcha();
    } catch (error: any) {
      const errorMessage = error?.msg || error?.message || "Đăng ký thất bại";
      openNotification({ type: "error", message: errorMessage });
      void fetchCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = isLoading || !captcha;

  return (
    <section className={styles.formSection}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Tạo tài khoản mới</h1>
        <p className={styles.formSubtitle}>
          Chỉ mất vài bước để bắt đầu, nhận ngay ưu đãi chào mừng dành riêng cho hội viên mới.
        </p>
      </header>

      <Form
        form={form}
        layout="vertical"
        className={styles.formContainer}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="captchaKey" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="name" label="Họ và tên" className={styles.inputField}>
          <Input size="large" placeholder="Tên hiển thị (không bắt buộc)" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên đăng nhập"
          className={styles.inputField}
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập" },
            { min: 5, message: "Tên đăng nhập tối thiểu 5 ký tự" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Chỉ sử dụng chữ, số và dấu gạch dưới",
            },
          ]}
        >
          <Input size="large" placeholder="Ví dụ: vipmember88" autoComplete="username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          className={styles.inputField}
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            {
              pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
              message: "Bao gồm ít nhất một chữ cái và một số",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Mật khẩu" autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          className={styles.inputField}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Nhập lại mật khẩu" autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          className={styles.inputField}
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^(0|\+?84)(\d{9})$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input size="large" placeholder="Ví dụ: 0912345678" autoComplete="tel" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          className={styles.inputField}
          rules={[{ type: "email", message: "Email không hợp lệ" }]}
        >
          <Input size="large" placeholder="Email nhận thông báo (không bắt buộc)" autoComplete="email" />
        </Form.Item>

        <Form.Item name="referral" label="Mã giới thiệu" className={styles.inputField}>
          <Input size="large" placeholder="Nhập mã nếu bạn có" />
        </Form.Item>

        <Form.Item
          name="captchaText"
          label="Mã bảo mật"
          className={styles.inputField}
          rules={[{ required: true, message: "Vui lòng nhập mã bảo mật" }]}
        >
          <div className={styles.captchaField}>
            <Input
              size="large"
              placeholder="Nhập mã bảo mật"
              autoComplete="off"
              maxLength={10}
              className={styles.captchaInput}
            />
            <div className={styles.captchaPreview}>
              <button
                type="button"
                className={styles.captchaImageWrapper}
                onClick={handleRefreshCaptcha}
                aria-label="Tải lại mã bảo mật"
              >
                {isCaptchaLoading ? (
                  <Spin size="small" />
                ) : (
                  captcha?.svg && (
                    <img
                      src={`data:image/png;base64,${captcha.svg}`}
                      alt="Mã bảo mật"
                      className={styles.captchaImage}
                    />
                  )
                )}
              </button>
              <button
                type="button"
                className={styles.refreshCaptcha}
                onClick={handleRefreshCaptcha}
                disabled={isCaptchaLoading}
              >
                <ReloadOutlined spin={isCaptchaLoading} />
                <span>Làm mới</span>
              </button>
            </div>
          </div>
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={isLoading}
          disabled={isSubmitDisabled}
          className={styles.primaryButton}
        >
          Đăng ký
        </Button>
      </Form>

      <div className={styles.statusMessage}>
        Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của 789BET. Vui lòng đảm bảo thông tin chính xác để hỗ trợ xác minh nhanh chóng.
      </div>

      <div className={styles.secondaryAction}>
        Đã có tài khoản? {" "}
        <button
          type="button"
          onClick={() => {
            const callback = searchParams.get("callbackUrl");
            const href = callback
              ? `/auth/login?callbackUrl=${encodeURIComponent(callback)}`
              : "/auth/login";
            router.push(href);
          }}
        >
          Đăng nhập ngay
        </button>
      </div>
    </section>
  );
};

export default RegisterForm;
