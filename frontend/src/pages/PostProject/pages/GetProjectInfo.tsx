import { useState } from "react";
import { FormPage, PageProps } from "../../../components/MultiForm/MultiForm";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormError } from "../../../types";


import styles from '../../../components/MultiForm/Pages.module.scss'
import Input from "../../../components/Input/Input";

export default function GetProjectInfo ({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData, errors: multiFormErrors }  = useFormContext()!;

  const [ values, setValues ] = useState({
    'name': formData.projectTitle ? formData.projectTitle : '',
    'description': formData.projectDescription ? formData.projectDescription : ''
  })
  const [ errors, setErrors ] = useState<FormError>({});

  const validate = async () => {return true}

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <Input
          name='Project Title'
          value={values.name} 
          onChange={(e) => setValues({...values, name: e.target.value})}
          error={errors.name}
        />
        <Input
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