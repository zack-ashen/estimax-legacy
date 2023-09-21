import { useEffect, useState } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormError, projectTypes, Timeline, locations } from "../../../types";
import { FormPage, PageProps } from "../../MultiForm/MultiForm";

import styles from '../../MultiForm/Pages.module.scss'
import MultiSelect from "../../../components/Inputs/MultiSelect/MultiSelect";
import Slider from "../../../components/Inputs/Slider/Slider";

export default function GetExtraDetails ({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData }  = useFormContext()!;

  const [ values, setValues ] = useState({
    'category': formData.category ? formData.category : [''],
    'timeline': formData.timeline ? formData.timeline : ''
  })
  const [ errors, setErrors ] = useState<FormError>({});

  useEffect(() => {
    setFormData(prevValue => ({
      ...prevValue,
      ...values
    }));
  }, [values, setFormData]);

  const validate = async () => {
    if (values.category[0] === '' || values.category.length === 0) {
      setErrors({
        category: 'Select one or more categories to help contractors find your project.'
      })
      return false;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      ...values
    }))

    return true
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <MultiSelect 
          options={projectTypes} 
          placeholder={'What category is your project?'} 
          isMulti={true}
          setSelectedOptions={(options) => setValues((prevValue => ({
            ...prevValue,
            category: options
          })))}
          error={errors.category}
        />
        {/* <MultiSelect 
          options={locations} 
          placeholder={'Where is your project?'}
          isMulti={undefined}
          setSelectedOptions={(options) => setValues((prevValue => ({
            ...prevValue,
            location: options
          })))}
          error={errors.location}
        /> */}
        <Slider 
          sliderStates={Object.values(Timeline)} 
          label={'What is your timeline?'}
          setUpstreamState={((state) => setValues(prevValues => ({
            ...prevValues,
            'timeline': state
          })))}/>
      </div>
    </FormPage>
  );
}