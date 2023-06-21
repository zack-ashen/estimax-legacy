
import styles from './PostProject.module.scss'
import { MultiFormProvider } from '../../contexts/MultiFormContext';
import MultiForm from '../../components/MultiForm/MultiForm';
import GetProjectInfo from './pages/GetProjectInfo';
import GetProjectImages from './pages/GetProjectImages';
import { ReactComponent as PencilIcon } from '../../assets/PencilIcon.svg';
import { ReactComponent as ImageAddIcon } from '../../assets/ImageAddIcon.svg';
import GetExtraDetails from './pages/GetExtraDetails';

const steps = [
  {
    page: GetProjectInfo,
    content: {
      header: "Project Info",
      subtitle: "Let's get some basic info about your project listing.",
      Icon: PencilIcon,
    }
  },
  {
    page: GetProjectImages,
    content: {
      header: "Add Images",
      subtitle: "Add images showing your project.",
      Icon: ImageAddIcon,
    }
  },
  {
    page: GetExtraDetails,
    content: {
      header: "Extra Details",
      subtitle: "Add some extra details about your project.",
      Icon: ImageAddIcon,
    }
  }
];

export default function PostProject() {

  return (
    <div className={styles.PostProject}>
      <MultiFormProvider onSubmit={() => undefined}>
        <MultiForm steps={steps} />
      </MultiFormProvider>

    </div>
  )
}