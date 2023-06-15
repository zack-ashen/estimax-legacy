import { useFormContext } from '../../../contexts/MultiFormContext';
import Input from '../../Input/Input';
import MultiSelect from '../../MultiSelect/MultiSelect';
import styles from './Pages.module.scss';
import { contractorTypes } from '../../../types/index';
import { FormPage, PageProps } from '../../MultiForm/MultiForm';


export default function GetBusinessInfo({ submitComponent, formSize, content}: PageProps) {
  
  const form = useFormContext();
  const { formData, setFormData } = form!;

  const validate = async () => {
    console.log("validate 3")
    return true
  }

  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <div className={styles.formInputContainer}>
        <div className={styles.twoColumnInputStaggered}>
          <Input
            type='text'
            name='Business Name'
            value={formData?.businessName ? formData.businessName : ''} 
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
          />
          <Input
            type='text'
            name='Phone Number'
            value={formData?.phoneNumber ? formData.phoneNumber : ''} 
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          />
        </div>
        <MultiSelect options={contractorTypes}/>
      </div>
    </FormPage>
  );

}