import Card, { CardWidth } from "../../components/Card/Card";
import FormHeader from "../../components/Forms/FormHeader/FormHeader";
import SignInForm from "../../components/Forms/SignInForm/SignInForm";
import AuthLayout from "../../components/Layouts/AuthLayout/AuthLayout";

export default function SignIn() {
  return (
    <AuthLayout>
      <Card align={"center"} width={CardWidth.XS}>
        <FormHeader
          title="Welcome back"
          subtitle="Enter your information to sign in."
        />

        <SignInForm />
      </Card>
    </AuthLayout>
  );
}
