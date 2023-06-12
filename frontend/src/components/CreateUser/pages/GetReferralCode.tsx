import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import styles from '../CreateUser.module.scss';


export default function GetReferralCode() {
  
  const form = useFormContext();
  const { formData, setFormData } = form!;

  return (
    <>
      <Input
        type='text'
        name='Referral Code'
        value={formData?.referral ? formData.referral : ''} 
        onChange={(e) => setFormData({...formData, referral: e.target.value})}
      />
    </>
  );

}


