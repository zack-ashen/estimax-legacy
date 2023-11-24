import Card, { CardWidth } from "../../components/Card/Card";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";
import Nib from "../../components/Nib/Nib";
import styles from "./Auth.module.scss";

interface SignUpProps {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SignUp({ setToken }: SignUpProps) {
  return (
    <AuthLayout>
      <Card width={CardWidth.SM} align={"left"}>
        <SignUpForm setToken={setToken} />
      </Card>
      <Nib variant="primary" text="Sign Up" />
      <Nib variant="green" text="Balls" />
      <Nib variant="red" text="N word" />
    </AuthLayout>
  );
}
