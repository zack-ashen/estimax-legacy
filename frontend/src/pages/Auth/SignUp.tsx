import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

import styles from "./Auth.module.scss";

export default function SignUp() {
  return (
    <AuthLayout>
      <div className={styles.SignUpCard}>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}
