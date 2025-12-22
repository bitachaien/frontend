import AuthIllustration from "@/components/Auth/AuthIllustration";
import RegisterForm from "@/components/Auth/RegisterForm";
import styles from "@/components/Auth/Auth.module.css";

const REGISTER_ILLUSTRATION = {
  image: "/images/login/backgroundLogin.png",
  title: "Gia nhập cộng đồng 789BET",
  subtitle:
    "Đăng ký tài khoản trong vài phút để nhận thưởng chào mừng, hoàn trả hấp dẫn và chương trình VIP độc quyền.",
  badge: {
    label: "Ưu đãi tân thủ",
    icon: "/images/login/register_logo.png",
  },
};

export const metadata = {
  title: "Đăng ký - 789BET",
  description: "Tạo tài khoản 789BET để bắt đầu hành trình giải trí cùng các sản phẩm cược đỉnh cao.",
};

const RegisterPage = () => {
  return (
    <main className={styles.authShell}>
      <div className={styles.authCard}>
        <AuthIllustration
          image={REGISTER_ILLUSTRATION.image}
          title={REGISTER_ILLUSTRATION.title}
          subtitle={REGISTER_ILLUSTRATION.subtitle}
          badge={REGISTER_ILLUSTRATION.badge}
        />
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
