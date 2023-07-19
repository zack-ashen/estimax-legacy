import { useParams } from 'react-router-dom'
import styles from './Project.module.scss'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


import { ReactComponent as ShareIcon } from '../../assets/ShareIcon.svg'
import { ReactComponent as BookmarkIcon } from '../../assets/BookmarkIcon.svg'
import { ReactComponent as MapPinIcon } from '../../assets/MapPinIcon.svg'
import { ReactComponent as CalendarIcon } from '../../assets/CalendarIcon.svg'
import { ReactComponent as ActivityIcon } from '../../assets/ActivityIcon.svg'


import { Project } from '../../types'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';


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


interface BidLineProps {
  bidId: string;
}

const BidLine = ({ bidId }: BidLineProps) => {
  const [ bid, setBid ] = useState()
  const { useAuthReq } = useAuth();
  const authReq = useAuthReq();

  useEffect(() => {
    authReq(`/bid/${bidId}`, {
      method: 'GET'
    })
      .then(res => res?.json())
      .then(data => setBid(data.bid))
  }, [])

  return (
    <div className={styles.BidLine}>

    </div>
  )
}


export default function ProjectView() {
  const { id } = useParams();
  const { useAuthReq } = useAuth();
  const authReq = useAuthReq();

  const [ project, setProject ] = useState<Project>()
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

  return (
    <div className={styles.Project}>
      <div className={styles.projectHeader}>
        <div className={styles.projectTitle}>
          <p>Project Name</p>
          <h5>{project?.name}</h5>
        </div>
        <div className={styles.projectInteractions}>
          <Button 
            buttonStyle={ButtonStyles.TERTIARY} 
            onClick={() => undefined}
            text={'Share'}
            Icon={ShareIcon} />
          <Button 
            buttonStyle={ButtonStyles.TERTIARY} 
            onClick={() => undefined}
            text={'Bookmark'}
            Icon={BookmarkIcon} />
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
              {project && project.bids.length !== 0 && project.bids.map((bidId) => (
                <BidLine bidId={bidId} />
              ))}
              <div className={styles.noBidsLine}>
                <p className={styles.noBidsText}>No Active Bids</p>
              </div>
            </div>
            <div className={styles.bidCTASection}>
              <Button 
                buttonStyle={ButtonStyles.PRIMARY} 
                onClick={() => undefined}
                text={'Place a Bid'} 
                wide />
              <Button 
                buttonStyle={ButtonStyles.SECONDARY} 
                onClick={() => undefined}
                text={'Contact Homeowner'} 
                wide/>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.extraDetailsSection}>
        <div className={styles.bidsSection}>
            <h5>Bids</h5>
        </div>
        <div className={styles.messagesSection}>
          <h5>Messages</h5>
        </div>
      </div>
    </div>
  )
}