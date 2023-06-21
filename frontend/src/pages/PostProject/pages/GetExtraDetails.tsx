import { useState } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormError, locations } from "../../../types";
import { FormPage, PageProps } from "../../../components/MultiForm/MultiForm";
import Input from "../../../components/Input/Input";

import styles from '../../../components/MultiForm/Pages.module.scss'
import MultiSelect from "../../../components/MultiSelect/MultiSelect";

export default function GetExtraDetails ({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData, errors: multiFormErrors }  = useFormContext()!;

  const [ values, setValues ] = useState({
    'name': formData.projectTitle ? formData.projectTitle : '',
    'description': formData.projectDescription ? formData.projectDescription : ''
  })
  const [ errors, setErrors ] = useState<FormError>({});

  const validate = async () => {return false}

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      {/* 1. Tags
      2. Location
      3. Timeline */}
      <MultiSelect options={locations} placeholder={'Where is your project?'} isMulti={undefined}/>
    </FormPage>
  );
}