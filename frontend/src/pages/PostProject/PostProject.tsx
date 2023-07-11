
import styles from './PostProject.module.scss'
import { MultiFormProvider } from '../../contexts/MultiFormContext';
import MultiForm from '../../components/Form/MultiForm/MultiForm';
import GetProjectInfo from './pages/GetProjectInfo';
import GetProjectImages from './pages/GetProjectImages';
import { ReactComponent as PencilIcon } from '../../assets/PencilIcon.svg';
import { ReactComponent as ImageAddIcon } from '../../assets/ImageAddIcon.svg';
import GetExtraDetails from './pages/GetExtraDetails';
import { ProjectDraft } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      Icon: PencilIcon,
    }
  }
];

export default function PostProject() {
  const { user, useAuthReq } = useAuth()!; 
  const authReq = useAuthReq();
  const navigate = useNavigate();

  const postProject = async (formObj: any) => {
    const projectDraft : ProjectDraft = formObj;

    console.log(formObj)

    let imageData = new FormData();
    projectDraft.images.forEach((image, index) => {
      imageData.append(`images`, image);
    });

    let imageKeys;

    try {
      const res = await authReq('/api/image/project-images', {
        method: 'POST',
        body: imageData
      });
  
      if (!res) {
        throw new Error('No response from server');
      }
  
      const data = await res.json();
  
      if (data.error) {
        // todo: add some sort of alert to communicate this error
        throw new Error('Error occurred while uploading imgages: ', data.error)
      } else {
        imageKeys = data.images;
      }
    } catch (err) {
      console.error(err);
      // Handle error appropriately
    }

    authReq('/api/project', {
      method: 'POST',
      body: JSON.stringify({
        homeownerId: user.uid,
        project: {
          ...projectDraft,
          images: imageKeys
        }
      })
    })
      .then(res => res ? res.json() : undefined)
      .then(data => {
        if (data) {
          if (data.error) {
            // todo: add some sort of alert to communicate this error
            console.error(data.error)
          } else {
            const projectId = data.projectId;
            navigate(`/project/${projectId}`)
          }
        }
      })
    
  }

  return (
    <div className={styles.PostProject}>
      <MultiFormProvider onSubmit={postProject}>
        <MultiForm steps={steps} />
      </MultiFormProvider>

    </div>
  )
}