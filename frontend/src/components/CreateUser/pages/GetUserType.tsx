import { useCallback } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import ToggleCardManager, { ToggleCard } from "../../ToggleCardManager/ToggleCardManager";
import { Roles } from "../../../types";
import { ReactComponent as HammerIcon } from '../../../assets/HammerIcon.svg';
import { ReactComponent as HouseIcon } from '../../../assets/HomeIcon.svg';
import { FormPage, PageProps } from "../../MultiForm/MultiForm";

const roleCards : ToggleCard[] = [
  {
    state: 'Homeowner',
    header: 'Homeowner',
    description: 'Sign up as a homeowner to post projects and get bids to get your job done.',
    Icon: HouseIcon
  },
  {
    state: 'Contractor',
    header: 'Service Pro',
    description: 'Sign up as a service pro to view and bid on leads from homeowners.',
    Icon: HammerIcon
  }
]

export default function GetUserType({ submitComponent, formSize, content}: PageProps) {
  const { formData, setFormData } = useFormContext()!;
  

  const updateUserType = useCallback((newUserRole: string) => {
    setFormData({...formData, role: newUserRole as Roles});
  }, []);

  const validate = async () => {
    console.log(formData)
    return true;
  }

  
  return (
    <FormPage validate={validate} submitComponent={submitComponent} formSize={formSize} content={content}>
      <ToggleCardManager cards={roleCards} toggleSwitch={updateUserType} toggled={formData.role ? formData.role : 'Homeowner'}/>
    </FormPage>
  );
}
