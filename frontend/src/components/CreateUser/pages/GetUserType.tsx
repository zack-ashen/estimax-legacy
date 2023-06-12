import { useCallback } from "react";
import { useFormContext } from "../../../contexts/MultiFormContext";
import ToggleCardManager, { ToggleCard } from "../../ToggleCardManager/ToggleCardManager";
import styles from "../CreateUser.module.scss";
import { Roles } from "../../../types";
import { ReactComponent as HammerIcon } from '../../../assets/HammerIcon.svg';
import { ReactComponent as HouseIcon } from '../../../assets/HomeIcon.svg';

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

export default function GetUserType() {
  const { formData, setFormData } = useFormContext()!;
  const updateUserType = useCallback((newUserRole: string) => {
    setFormData({...formData, role: newUserRole as Roles});
  }, [setFormData]);

  
  return (
    <>
      <ToggleCardManager cards={roleCards} toggleSwitch={updateUserType} />
    </>
  );
}
