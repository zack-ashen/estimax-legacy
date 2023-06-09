import { CreateUserPageProps, CreateUserElementHeader } from '../CreateUser';

export function GetReferralCode({ setNewUser, setStep, hidden=false } : CreateUserPageProps) {

  return hidden ? (
    <CreateUserElementHeader step={1} title={"Do you have access?"} hidden/>
  ) :
  (
    <>
      <CreateUserElementHeader step={1} title={"Do you have access?"}/>

    </>
  )
}