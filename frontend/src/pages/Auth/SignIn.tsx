import FormHeader from "../../components/Forms/FormHeader/FormHeader";
import SignInForm from "../../components/Forms/SignInForm/SignInForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

import styles from "./Auth.module.scss";

export default function SignIn() {
  return (
    <AuthLayout>
      <div className={styles.SignInCard}>
        <FormHeader
          title="Welcome back"
          subtitle="Enter your information to sign in."
        />

        <SignInForm />
      </div>
    </AuthLayout>
  );
}
