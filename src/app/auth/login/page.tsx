import AuthIllustration from "@/components/Auth/AuthIllustration";
import LoginForm from "@/components/Auth/LoginForm";
import styles from "@/components/Auth/Auth.module.css";

const LOGIN_ILLUSTRATION = {
  image: "/images/login/background.jpg",
  title: "Trải nghiệm cá cược đẳng cấp",
  subtitle:
    "Kho trò chơi đa dạng, tỷ lệ kèo hấp dẫn và dịch vụ chăm sóc khách hàng 24/7 dành riêng cho bạn.",
  badge: {
    label: "Hệ sinh thái 789BET",
    icon: "/images/login/icon_download.png",
  },
};

export const metadata = {
  title: "Đăng nhập - 789BET",
  description: "Đăng nhập tài khoản thành viên 789BET để tận hưởng ưu đãi độc quyền.",
};

const LoginPage = () => {
  return (
    <main className={styles.authShell}>
      <div className={styles.authCard}>
        <AuthIllustration
          image={LOGIN_ILLUSTRATION.image}
          title={LOGIN_ILLUSTRATION.title}
          subtitle={LOGIN_ILLUSTRATION.subtitle}
          badge={LOGIN_ILLUSTRATION.badge}
        />
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
