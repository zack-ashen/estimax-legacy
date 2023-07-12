
import { useEffect, useState } from 'react';
import { Project } from '../../types';
import styles from './ProjectCard.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { ReactComponent as StarIcon } from '../../assets/StarIcon.svg'
import { ReactComponent as MapIcon } from '../../assets/MapPinIcon.svg'
import { ReactComponent as ActivityIcon } from '../../assets/ActivityIcon.svg'
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { useAuthReq } = useAuth()!; 
    const authReq = useAuthReq();
    const navigate = useNavigate();

    const [ url, setUrl ] = useState();

    useEffect(() => {
        authReq(`/api/image/project-image/${project.images[0]}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setUrl(data.url))
    }, [project.images])

    return (
        <div className={styles.ProjectCard} onClick={() => navigate(`/project/${project._id}`)}>
            <div className={styles.header}>
                <p>{project.name}</p>
                <StarIcon className={styles.starIcon}/>
            </div>
            <img src={url} alt={'projectImage'} className={styles.projectImage}/>
            <div className={styles.projectDetails}>
                <div className={styles.priceSection}>
                    <p>Lowest Bid</p>
                    <h4>{project.lowestBid ? `${project.lowestBid}` : 'N/A'}</h4>
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.info}>
                        <MapIcon className={styles.infoIcon}/>
                        <p>{project.location}</p>
                    </div>

                    <div className={styles.info}>
                        <ActivityIcon className={styles.infoIcon} />
                        <p>{project.bids.length} Bids</p>
                    </div>
                </div>
            </div>
        </div>
    )
}