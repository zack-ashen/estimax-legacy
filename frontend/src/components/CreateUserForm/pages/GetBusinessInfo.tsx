import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Inputs/TextInput/TextInput';
import MultiSelect from '../../Inputs/MultiSelect/MultiSelect';
import styles from '../../MultiForm/Pages.module.scss';
import { FormError, contractorTypes } from '../../../types/index';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';
import * as Yup from 'yup'
import { useState } from 'react';
import LocationSearch from '../../LocationSearch/LocationSearch';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required('You must enter a company name.'),
  phoneNumber: Yup.string()
      .length(10, 'Phone number should be 10 digits.')
      .matches(phoneRegExp, 'Phone number is not valid.')
      .required('Phone number is required.'),
  location: Yup.object().required('You must enter a location.'),
      
});

export default function GetBusinessInfo({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData }  = useFormContext()!;

  const [ values, setValues ] = useState({
    'businessName': formData.businessName ? formData.businessName : '',
    'phoneNumber': formData.phoneNumber ? formData.phoneNumber : '',
    'contractorType': formData.contractorType ? formData.contractorType : '',
    'location': formData.location ? formData.location : ''
  })
  const [ errors, setErrors ] = useState<FormError>({});

  const validate = async () => {
    let success = false;
    await validationSchema.validate(values, { abortEarly: false })
      .then(() => {
        setErrors({})
        setFormData({
          ...formData,
          businessName: values.businessName,
          phoneNumber: values.phoneNumber,
          contractorType: values.contractorType,
          location: values.location
        })

        success = true;
      })
      .catch((err: Yup.ValidationError) => {
        let errs: FormError = {};
        err.inner.forEach((err: Yup.ValidationError) => {
          errs[err.path!] = err.message;
        });
        setErrors(errs);
      });
    return success;
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <div className={styles.twoColumnInputStaggered}>
          <Input
            type='text'
            name='Business Name'
            value={values.businessName} 
            onChange={(e) => setValues({...values, businessName: e.target.value})}
            error={errors.businessName}
          />
          <Input
            type='tel'
            name='Phone Number'
            value={values.phoneNumber} 
            onChange={(e) => setValues({...values, phoneNumber: e.target.value})}
            error={errors.phoneNumber}
          />
        </div>
        <LocationSearch type={'cities'} label={'Where are you primarily based?'} setLocation={(locationData) => setValues({...values, location: locationData})} />
        <MultiSelect 
          options={contractorTypes} 
          placeholder={'What type of contractor are you?'}
          setSelectedOptions={(options) => setValues((prevValues) => ({
            ...prevValues,
            'contractorType': options
          }))}/>
      </div>
    </FormPage>
  );

}