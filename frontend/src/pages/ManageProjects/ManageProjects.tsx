import React, { useEffect, useState } from 'react';

import styles from './ManageProjects.module.scss'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import Tabview from '../../components/Tabview/Tabview';
import { useAuth } from '../../contexts/AuthContext';

import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg';
import { ReactComponent as EmptyCubeIcon } from '../../assets/EmptyCubeIcon.svg';
import { ReactComponent as AddIcon } from '../../assets/PlusIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types';
import ProjectCard from '../../components/ProjectCard/ProjectCard';




export const Tab = {
  DRAFT_PROJECTS: 'Draft Projects',
  ACTIVE_PROJECTS: 'Active Projects',
  FAVORITE_CONTRACTORS: 'Favorite Contractors'
} as const;

type TabType = typeof Tab[keyof typeof Tab];

interface ProjectTabContentProps {
  projects: Project[];
}

const ProjectTabContent = ({ projects }: ProjectTabContentProps) => {

  return (
    <div className={styles.TabContent}>
      {projects.map((project, index) => (
        <ProjectCard project={project} key={index}/>
      ))}
    </div>
  )
}

const FavoriteContractors = () => {

  return (
    <div className={styles.TabContent}>
    </div>
  )
}

function ManageProjects() {
  const [ tab, setTab ] = useState<TabType>(Tab.ACTIVE_PROJECTS);
  const [ projects, setProjects ] = useState<Project[]>([]);
  const navigate = useNavigate();

  const { useAuthReq, user } = useAuth();
  const authReq = useAuthReq();

  useEffect(() => {
    authReq(`/api/project/user/${user.uid}`, {
      method: 'GET'
    })
      .then(res => res?.json())
      .then(data => {
        if (data.projects)
          setProjects(data.projects)
      })
  }, [])

  return projects.length === 0 ? (
    <>
    <DecorativeGrid className={styles.decorativeGrid}/>
    <div className={styles.EmptyManageProjects}>
      <div className={styles.emptyCubeContainer}><EmptyCubeIcon /></div>
      <div className={styles.createProjectCTA}>
        <h3>You have no projects.</h3>
        <p>Get started by posting a project and getting bids from service providers in your area.</p>
      </div>
      <Button buttonStyle={ButtonStyles.PRIMARY} onClick={() => navigate('post-project/')} text={'Create Project'} Icon={AddIcon}/>
    </div>
    </>
  ) : 
  (
    <>
    <Tabview<typeof Tab>
        pageTitles={[Tab.ACTIVE_PROJECTS, Tab.DRAFT_PROJECTS, Tab.FAVORITE_CONTRACTORS]} 
        setTab={(tab: TabType) => setTab(tab)}
        tab={tab}
    />
    <div className={styles.ManageProjects}>
      {tab === Tab.ACTIVE_PROJECTS &&
        <ProjectTabContent projects={projects.filter(project => project.status === 'In Progress')}/>
      }
      {tab === Tab.DRAFT_PROJECTS &&
        <ProjectTabContent projects={projects.filter(project => project.status === 'Draft')}/>
      }
      {tab === Tab.FAVORITE_CONTRACTORS &&
        <FavoriteContractors />
      }
    </div>
    </>
  );
}

export default ManageProjects;