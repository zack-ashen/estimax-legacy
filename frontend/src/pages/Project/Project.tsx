import { useParams } from 'react-router-dom'
import styles from './Project.module.scss'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


import { ReactComponent as ShareIcon } from '../../assets/ShareIcon.svg'
import { ReactComponent as BookmarkIcon } from '../../assets/BookmarkIcon.svg'
import { ReactComponent as MapPinIcon } from '../../assets/MapPinIcon.svg'
import { ReactComponent as CalendarIcon } from '../../assets/CalendarIcon.svg'
import { ReactComponent as ActivityIcon } from '../../assets/ActivityIcon.svg'
import { ReactComponent as PencilIcon } from '../../assets/PencilIcon.svg'
import { ReactComponent as PersonAddIcon } from '../../assets/PersonAddIcon.svg'
import { ReactComponent as TrashIcon } from '../../assets/TrashIcon.svg'
import { ReactComponent as SaveIcon } from '../../assets/CheckIcon.svg'


import { Bid, Project, Roles } from '../../types'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import BidCard from '../../components/BidCard/BidCard';
import Modal from '../../components/Modal/Modal';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import CreateBidModal from '../../components/CreateBidModal/CreateBidModal';
import DeleteProjectModal from '../../components/DeleteProjectModal/DeleteProjectModal';
import EditableText from '../../components/EditableText/EditableText';


interface ProjectInfoTagProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  info: string;
}

const ProjectInfoTag = ({ Icon, title, info }: ProjectInfoTagProps) => (
  <div className={styles.ProjectInfoTag}>
    <Icon className={styles.icon}/>
    <div className={styles.infoText}>
      <p className={styles.title}>{title}</p>
      <p className={styles.info}>{info}</p>
    </div>
  </div>
)


export default function ProjectView() {
  const { id } = useParams();
  const { useAuthReq, user } = useAuth();
  const authReq = useAuthReq();

  const [ project, setProject ] = useState<Project>()
  const [ showCreateBidModal, setShowCreateBidModal ] = useState(false);
  const [ showContactModal, setShowContactModal ] = useState(false);
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ editProject, setEditProject ] = useState(false)
  const [ image, setImage ] = useState();

  useEffect(() => {
    authReq(`/api/project/${id}`, {
      method: 'GET'
    })
      .then(res => res?.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          authReq(`/api/image/project-image/${data.project?.images[0]}`, {
            method: 'GET'
          })
            .then(res => res?.json())
            .then(data => {
              setImage(data.url);
            })


          setProject(data.project);
        }
      })
    
  }, [])

  // const bookmarkProject = () => {
  //   authReq(`/api/user/${user.uid}/bookmark/`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       project: id
  //     })
  //   })
  //     .then((res) => res?.json())
  //     .then(data => setUser(data.project))

  // }

  return (
    <div className={styles.Project}>
      {user.role === Roles.HOMEOWNER &&
        <div className={styles.EditProjectContainer}>
          <div className={styles.leftButtonContainer}>
            <Button 
              buttonStyle={ButtonStyles.TERTIARY} 
              text={editProject ? 'Save Project' : 'Edit Project'}
              Icon={editProject ? SaveIcon : PencilIcon} 
              onClick={() => setEditProject(prevState => !prevState)} />
            <Button buttonStyle={ButtonStyles.TERTIARY} text={'Invite Contractor'} Icon={PersonAddIcon} onClick={() => undefined} />
          </div>
          <Button buttonStyle={ButtonStyles.PRIMARY_ALT} text={'Delete Project'} Icon={TrashIcon} onClick={() => setShowDeleteModal(true)} />
        </div>
      }

      <div className={styles.projectHeader}>
        <div className={styles.projectTitle}>
          <p>Project Name</p>
          <EditableText editMode={editProject} textValue={project ? project!.name : ''} setValue={() => undefined}>
            <h5>{project?.name}</h5>
          </EditableText>
        </div>
        <div className={styles.projectInteractions}>
          <Button 
            buttonStyle={ButtonStyles.TERTIARY} 
            onClick={() => undefined}
            text={'Invite a Contractor'}
            Icon={ShareIcon} />
          {user.role === Roles.CONTRACTOR && <Button 
            buttonStyle={ButtonStyles.TERTIARY} 
            onClick={() => undefined}
            text={'Bookmark'}
            Icon={BookmarkIcon} />}
        </div>
      </div>

      <div className={styles.projectDetailsContainer}>
        <div className={styles.imgContainer}>
          <img src={image} className={styles.image} alt='project' />
        </div>
        <div className={styles.projectDetails}>
          <div className={styles.descriptionSection}>
            <p className={styles.descriptionHeader}>Description</p>
            <p>{project?.description}</p>
          </div>

          <div className={styles.projectInfo}>
            <ProjectInfoTag Icon={MapPinIcon} title='Location' info={project?.location!} />
            <ProjectInfoTag Icon={CalendarIcon} title='Timeline' info={project?.timeline!} />
            <ProjectInfoTag Icon={ActivityIcon} title='Activity' info={`${project?.bids.length.toString()!} Bids`} />
          </div>

          <div className={styles.priceSection}>
            <div className={styles.bidsSection}>
              <h5>Bids</h5>
              {project && project.bids.length !== 0 && project.bids.map((bid) => (
                <BidCard bid={bid} lowestBid={Object.is(bid, project.lowestBid)}/>
              ))}
              {project?.bids.length === 0 &&
                <div className={styles.noBidsLine}>
                  <p className={styles.noBidsText}>No Active Bids</p>
                </div>
              }
            </div>
            {user.role === Roles.CONTRACTOR && <div className={styles.bidCTASection}>
              <Button 
                buttonStyle={ButtonStyles.PRIMARY} 
                onClick={() => setShowCreateBidModal(true)}
                text={'Place a Bid'} 
                wide />
              <Button 
                buttonStyle={ButtonStyles.SECONDARY} 
                onClick={() => setShowContactModal(true)}
                text={'Contact Homeowner'} 
                wide/>
            </div>}
          </div>
        </div>
      </div>

      <CreateBidModal showCreateBidModal={showCreateBidModal} setShowCreateBidModal={setShowCreateBidModal} projectId={id!} setProject={setProject}/>
      <DeleteProjectModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} projectId={id!} />

      <Modal show={showContactModal} onClose={() => setShowContactModal(false)}>
        <div className={styles.showContactModal}>
          <div className={styles.modalHeader}>
            <div className={styles.headerIconContainer}>
              <span className={styles.headerIcon}>?</span>
            </div>
            <h3>Ask Question</h3>
            <p>Ask a question about this project. You can request more details or information about the proposed work.</p>
          </div>
          <TextInput name={'I am curious about...'} value={''} onChange={() => undefined} type={'textarea'} />
          <Button buttonStyle={ButtonStyles.PRIMARY} text={'Ask Question'} onClick={() => undefined} wide/>
        </div>
      </Modal>

      <div className={styles.extraDetailsSection}>
          <div>
          <h3>Messages</h3>
          <div className={styles.horizontalDivider} />
          </div>
          <p>No current messages.</p>
      </div>
    </div>
  )
}