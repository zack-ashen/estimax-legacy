import { useState } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormPage, PageProps } from "../../../components/MultiForm/MultiForm";

import styles from '../../../components/MultiForm/Pages.module.scss'
import MediaInput from "../../../components/Inputs/MediaInput/MediaInput";

export default function GetProjectImages ({ submitComponent, formSize, content}: PageProps) {
  const { setFormData }  = useFormContext()!;
  const [files, setFiles] = useState<File[]>([]);
  const [ invalidInput, setInvalidInput ] = useState('');

  const validate = async () => {
    if (files.length === 0) {
      setInvalidInput('You must submit an image.')
      return false;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      images: files
    }))
    

    return true;
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <MediaInput setFiles={setFiles} invalidInput={invalidInput}/>
      </div>
    </FormPage>
  );
}