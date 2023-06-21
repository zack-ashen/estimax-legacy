import { useEffect, useState } from 'react';
import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import styles from '../../MultiForm/Pages.module.scss';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';
import * as Yup from 'yup'
import { FormError } from '../../../types';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('You must enter your name.'),
  email: Yup.string().email('Email is invalid').required('You must enter an email'),
  password: Yup.string().min(8, 'Your password must be at least 8 characters.').required('You must enter a password'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});


export default function GetUserInfo({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData, errors: multiFormErrors }  = useFormContext()!;

  const [ values, setValues ] = useState({
    'name': formData.name ? formData.name : '',
    'email': formData.email ? formData.email : '',
    'password': formData.password ? formData.password : '',
    'confirmPassword': '',
  })
  const [ errors, setErrors ] = useState<FormError>({});

  useEffect(() => {
    setFormData(prevValue => ({
      ...prevValue,
      ...values
    }));
  }, [values, setFormData]);

  const validate = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
  
      setErrors({}); // Clears any previous errors
  
      // Instead of immediately returning, we set state and provide a callback
      // This ensures our state is updated before proceeding
      console.log(values.name)
      setFormData(prevState => ({
        ...prevState,
        ...values
      }));
  
      // We reach this point only if validation was successful
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        let errs: FormError = {};
        err.inner.forEach((err: Yup.ValidationError) => {
          errs[err.path!] = err.message;
        });
        setErrors(errs);
      }
  
      return false; // Form is not valid, so return false
    }
  };

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <Input
          type='text'
          name='Name'
          value={values.name} 
          onChange={(e) => setValues({...values, name: e.target.value})}
          error={errors.name}
        />
        <Input
          type='text'
          name='Email'
          value={values.email} 
          onChange={(e) => setValues({...values, email: e.target.value})}
          error={errors.email ? errors.email : multiFormErrors.email}
        />
        <div className={styles.twoColumnInput}>
          <Input
            type='password'
            name='Password'
            value={values.password} 
            onChange={(e) => setValues({...values, password: e.target.value})}
            error={errors.password}
          />
          <Input
            type='password'
            name='Confirm Password'
            value={values.confirmPassword} 
            onChange={(e) => setValues({...values, confirmPassword: e.target.value})}
            error={errors.confirmPassword}
          />
        </div>
      </div>
    </FormPage>
  );

}