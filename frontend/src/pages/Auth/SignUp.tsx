import Card, { CardWidth } from "../../components/Card/Card";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

export default function SignUp() {
  return (
    <AuthLayout>
      <Card width={CardWidth.XS} align={"left"}>
        <SignUpForm />
      </Card>
    </AuthLayout>
  );
}
