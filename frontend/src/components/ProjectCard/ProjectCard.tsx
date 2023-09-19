
import { useEffect, useState } from 'react';
import { Project, Roles } from '../../types';
import styles from './ProjectCard.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { ReactComponent as BookmarkIcon } from '../../assets/BookmarkIcon.svg'
import { ReactComponent as MapIcon } from '../../assets/MapPinIcon.svg'
import { ReactComponent as ActivityIcon } from '../../assets/ActivityIcon.svg'
import { useNavigate } from 'react-router-dom';
import ImageSlides from '../ImageSlides/ImageSlides';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { useAuthReq, user } = useAuth()!; 
    const authReq = useAuthReq();
    const navigate = useNavigate();
    const [ bookmarked, setBookmarked ] = useState(false);

    const [ urls, setUrls ] = useState<string[]>([]);

    useEffect(() => {
        authReq(`/api/image/project-image/${project.images}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setUrls(data.urls))
        
        authReq(`/api/contractor/${user.uid}/bookmarks`, {
            method: 'GET',
        })
            .then(res => res?.json())
            .then(data => {
                const bookmarkedIds : string[] = data.bookmarks;
                if (bookmarkedIds && bookmarkedIds.includes(project.id)) {
                    setBookmarked(true);
                } else {
                    setBookmarked(false);
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.images])

    const toggleBookmark = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        authReq(`/api/contractor/${user.uid}/bookmark/`, {
            method: 'POST',
            body: JSON.stringify({ 
                project: project.id,
                bookmark: bookmarked 
            })
        })
            .then(res => {
                if (res?.status === 200) {
                    setBookmarked(prevBookmarked => !prevBookmarked);
                }
            })




        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div className={styles.ProjectCard} onClick={() => navigate(`/project/${project.id}`)}>
            <div className={styles.header}>
                <p>{project.name}</p>
                {user.role === Roles.CONTRACTOR && <button className={`${styles.bookmarkToggle} ${styles[bookmarked ? 'bookmarked' : '']}`} onClick={toggleBookmark}><BookmarkIcon className={styles.starIcon}/></button> }
            </div>
            <ImageSlides images={urls} small/>
            {/* <img src={url} alt={'projectImage'} className={styles.projectImage}/> */}
            <div className={styles.projectDetails}>
                <div className={styles.priceSection}>
                    <p>Lowest Bid</p>
                    <h4>{project.lowestBid ? `$${project.lowestBid.amount}` : 'N/A'}</h4>
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