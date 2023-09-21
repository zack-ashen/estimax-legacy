import { useEffect, useState } from "react";
import { FormPage, PageProps } from "../../MultiForm/MultiForm";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormError } from "../../../types";
import * as Yup from 'yup'
import styles from '../../MultiForm/Pages.module.scss'
import TextInput from "../../../components/Inputs/TextInput/TextInput";
import LocationSearch from "../../LocationSearch/LocationSearch";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('You must enter a project name.'),
  description: Yup.string().min(40, 'You must write a longer description.').max(300, 'You must write a shorter description.').required('You must enter a project description.'),
  location: Yup.object().required('You must enter a location for your project.')
});

export default function GetProjectInfo ({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData }  = useFormContext()!;



  const [ values, setValues ] = useState({
    'name': formData.name ? formData.name : '',
    'description': formData.description ? formData.description : '',
    'location': formData.location ? formData.location : '',
    'unit': formData.unit ? formData.unit : ''
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
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <TextInput
          name='Project Title'
          value={values.name} 
          onChange={(e) => setValues({...values, name: e.target.value})}
          error={errors.name}
        />
        <LocationSearch 
          type="address" 
          label={'What is the address for your project?'} 
          setLocation={(locationData) => setValues({...values, location: locationData})} 
          error={errors.location}
        />
        <TextInput
          name='Unit or Apt. #'
          value={values.unit} 
          onChange={(e) => setValues({...values, unit: e.target.value})}
          error={errors.unit}
        />
        <TextInput
          type="textarea"
          name='Project Description'
          value={values.description} 
          onChange={(e) => setValues({...values, description: e.target.value})}
          error={errors.description}
        />
      </div>
    </FormPage>
  );
}