import Button, { ButtonStyles } from "../../Button/Button";
import TextInput from "../../TextInput/TextInput";
import Form from "../Form/Form";

export default function SignInForm() {
  return (
    <Form
      defaultValues={{ email: "", password: "" }}
      submitButtonDetails={{
        text: "Sign In",
        action: () => {},
        wide: true,
      }}
    >
      <TextInput
        type="email"
        placeholder="Email"
        name={"Email"}
        value={""}
        onChange={() => {}}
      />
      <TextInput
        type="password"
        placeholder=""
        name={"Password"}
        value={""}
        onChange={() => {}}
      />
    </Form>
  );
}
