
import { useEffect, useState } from 'react';
import { Project } from '../../types';
import styles from './ProjectCard.module.scss';
import { useAuth } from '../../contexts/AuthContext';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { useAuthReq } = useAuth()!; 
    const authReq = useAuthReq();

    const [ url, setUrl ] = useState();

    useEffect(() => {
        authReq(`/api/image/project-image/${project.images[0]}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setUrl(data.url))
    })

    return (
        <div className={styles.ProjectCard}>
            <div className={styles.header}>
                <h5>{project.name}</h5>
                <p>Star</p>
            </div>
            <img src={url} alt={'projectImage'}/>
            <div className={styles.projectDetails}>
                <div className={styles.priceSection}>
                    <p>Lowest Bid</p>
                    <p>{project.lowestBid}</p>
                </div>
                <div className={styles.infoSection}>

                </div>
            </div>
        </div>
    )
}