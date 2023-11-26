import Card, { CardWidth } from "../../components/Card/Card";
import SignInForm from "../../components/Forms/SignInForm/SignInForm";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import styles from "./Auth.module.scss";

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SignIn({ signIn }: SignInProps) {
  return (
    <AuthLayout>
      <Card width={CardWidth.XS} align={"center"}>
        <p className={`${styles.SectionHeader}`}>Welcome back</p>
        <p className={`${styles.SectionSubtitle} ${styles.subtitle}`}>
          Enter your information to sign back in.
        </p>

        <SignInForm />
        <GoogleAuth type="signin" />
      </Card>
    </AuthLayout>
  );
}
