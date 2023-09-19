import { CreateUserForm } from '../../components/CreateUserForm/CreateUserForm';
import AppLayout, { PageSizes } from '../../components/AppLayout/AppLayout';
import { MultiFormProvider } from '../../contexts/MultiFormContext';
import { Homeowner, Contractor } from '../../types';

interface SignInProps {
  signIn: (token: string, user: Homeowner | Contractor) => void;
}


function SignUp({ signIn }: SignInProps) {
  return (
    <AppLayout maxWidth={PageSizes.SMALL}>
    <MultiFormProvider onSubmit={() => undefined}>
      <CreateUserForm signIn={signIn}/>
    </MultiFormProvider>
    </AppLayout>
  );
}

export default SignUp;