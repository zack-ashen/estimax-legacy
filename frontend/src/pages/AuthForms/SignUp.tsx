import { CredentialResponse } from '@react-oauth/google';

import { PreAuth } from '../../App';
import { CreateUser } from '../../components/CreateUser/CreateUser';
import { MultiFormProvider } from '../../contexts/MultiFormContext';

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

export interface authWithGoogleArgs extends CredentialResponse {
  user: PreAuth | undefined;
}





function SignUp({ signIn }: SignInProps) {
  return (
    <div>
      <MultiFormProvider onSubmit={() => undefined}>
        <CreateUser signIn={signIn}/>
      </MultiFormProvider>
    </div>
  );
}

export default SignUp;