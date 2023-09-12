import { useEffect, useState } from 'react';
import Tabview from '../../components/Tabview/Tabview'
import styles from './ContractorDashboard.module.scss'
import { Contractor, Project } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

export const Tab = {
    INVITED_PROJECTS: 'Invited Projects',
    BIDDED_PROJECTS: 'Bidded Projects',
    ACTIVE_PROJECTS: 'Active Projects',
    BOOKMARKED_PROJECTS: 'Bookmarked Projects'
} as const;
type TabType = typeof Tab[keyof typeof Tab];

interface ProjectTabContentProps {
    projects: Project[];
}

const ProjectTabContent = ({ projects }: ProjectTabContentProps) => {

    return (
      <div className={styles.TabContent}>
        {projects.length !== 0 && projects.map((project, index) => (
          <ProjectCard project={project} key={index}/>
        ))}

        {projects.length === 0 &&
            <div className={styles.empty}></div>
        }
      </div>
    )
}



export default function ContractorDashboard() {
    const [ tab, setTab ] = useState<TabType>(Tab.INVITED_PROJECTS);
    const [ biddedProjects, setBiddedProjects ] = useState<Project[]>([]);
    const [ invitedProjects, setInvitedProjects ] = useState<Project[]>([]);
    const [ activeProjects, setActiveProjects ] = useState<Project[]>([]);
    const [ bookmarkedProjects, setBookmarkedProjects ] = useState<Project[]>([]);

    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();

    useEffect(() => {
        authReq(`/api/contractor/${user.uid}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => {
                const contractor : Contractor = data.contractor;
                const {biddedProjects, 
                       invitedProjects, 
                       securedProjects,
                       starredProjects} = contractor;
                
                authReq(`/api/project/multiple`, {
                    method: 'POST',
                    body: JSON.stringify({
                        projects: [...biddedProjects, ...invitedProjects, ...securedProjects, ...starredProjects]
                    })
                })
                    .then(res => res?.json())
                    .then(data => {
                        const projects = data.projects;
                        setBiddedProjects(projects.slice(0, biddedProjects.length))
                        setInvitedProjects(projects.slice(biddedProjects.length, invitedProjects.length))
                        setActiveProjects(projects.slice(invitedProjects.length, securedProjects.length))
                        setBookmarkedProjects(projects.slice(securedProjects.length, starredProjects.length))
                    })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Tabview<typeof Tab>
            pageTitles={Object.values(Tab)} 
            setTab={(tab: TabType) => setTab(tab)}
            tab={tab}
        />
        <div className={styles.ContractorDashboard}>
            {tab === Tab.INVITED_PROJECTS && 
                <ProjectTabContent projects={invitedProjects} />
            }
            {tab === Tab.BIDDED_PROJECTS && 
                <ProjectTabContent projects={biddedProjects} />
            }
            {tab === Tab.BOOKMARKED_PROJECTS && 
                <ProjectTabContent projects={bookmarkedProjects} />
            }
            {tab === Tab.ACTIVE_PROJECTS && 
                <ProjectTabContent projects={activeProjects} />
            }
        </div>
        </>
    )
}