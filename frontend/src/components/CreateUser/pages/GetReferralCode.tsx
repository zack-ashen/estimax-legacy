import { useState } from 'react';
import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';
import * as Yup from 'yup';

// Define validation schema
const validationSchema = Yup.string().required('You must enter a referral code.')


export default function GetReferralCode({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData } = useFormContext()!;
  const [referralCode, setReferralCode] = useState(formData.referral ? formData.referral : '');
  const [error, setError] = useState<string | undefined>();

  const validate = async () => {
    let success = false;
    await validationSchema.validate(referralCode)
    .then(() => {
      setError(undefined);
      setFormData({...formData, referral: referralCode});
      success = true;
    }).catch((err: Yup.ValidationError) => {
      setError(err.message)
    })
    
    return success;
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <Input
        type='text'
        name='Referral Code'
        value={referralCode} 
        onChange={(e) => setReferralCode(e.target.value)}
        error={error}
      />
    </FormPage>
  );

}