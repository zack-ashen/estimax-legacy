import { CredentialResponse } from '@react-oauth/google';

import { PreAuth } from '../../App';
import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import { MultiFormProvider } from '../../contexts/MultiFormContext';

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

export interface authWithGoogleArgs extends CredentialResponse {
  user: PreAuth | undefined;
}





function SignUp({ signIn }: SignInProps) {
  return (
    <MultiFormProvider onSubmit={() => undefined}>
      <CreateUserForm signIn={signIn}/>
    </MultiFormProvider>
  );
}

export default SignUp;