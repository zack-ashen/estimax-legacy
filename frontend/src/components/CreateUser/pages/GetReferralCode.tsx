import { useState } from 'react';
import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';

export default function GetReferralCode({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData } = useFormContext()!;
  const [referral, setReferral] = useState(formData.referral ? formData.referral : '');
  const [error, setError] = useState<string | undefined>();
  const [validReferral, setValidReferral] = useState<boolean>();

  const validate = async () => {
    await validateReferralCode();
    if (validReferral) {
      setFormData({ ...formData, referral });
      return true;
    }
    return false;
  }

  const validateReferralCode = async () => {
    const response = await fetch('/api/auth/validate-referral', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        referral
      })
    });
    const data = await response.json();
    if (data.ok) {
      setError(undefined)
      setValidReferral(true);
    } else {
      setValidReferral(false);
      setError('Invalid referral code.')
    }
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <Input
        type='text'
        name='Referral Code'
        value={referral} 
        onChange={(e) => setReferral(e.target.value)}
        error={error}
        valid={validReferral}
        onBlur={validateReferralCode}
      />
    </FormPage>
  );

}