import { useState } from 'react';
import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import styles from './Pages.module.scss';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';


export default function GetUserInfo({ submitComponent, formSize, content}: PageProps) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const form = useFormContext();
  const { formData, setFormData } = form!;

  const validate = async () => {
    console.log("validate 4")
    return false
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <Input
          type='text'
          name='Name'
          value={formData?.name ? formData.name : ''} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <Input
          type='text'
          name='Email'
          value={formData?.email ? formData.email : ''} 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <div className={styles.twoColumnInput}>
          <Input
            type='password'
            name='Password'
            value={formData?.password ? formData.password : ''} 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Input
            type='password'
            name='Confirm Password'
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
    </FormPage>
  );

}