import { useState } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import { FormPage, PageProps } from "../../../components/MultiForm/MultiForm";

import styles from '../../../components/MultiForm/Pages.module.scss'
import MediaInput from "../../../components/MediaInput/MediaInput";

export default function GetProjectImages ({ submitComponent, formSize, content}: PageProps) {
  const { setFormData }  = useFormContext()!;
  const [files, setFiles] = useState<File[]>([])

  const validate = async () => {
    console.log(files)

    setFormData(prevFormData => ({
      ...prevFormData,
      images: files
    }))
    

    return true;
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <MediaInput setFiles={setFiles}/>
      </div>
    </FormPage>
  );
}