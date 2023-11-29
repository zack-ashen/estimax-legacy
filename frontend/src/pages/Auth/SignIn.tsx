import Card, { CardWidth } from "../../components/Card/Card";
import FormHeader from "../../components/Forms/FormHeader/FormHeader";
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
      <Card align={"center"}>
        <FormHeader
          title="Welcome back"
          subtitle="Enter your information to sign in."
        />

        <SignInForm />
      </Card>
    </AuthLayout>
  );
}
