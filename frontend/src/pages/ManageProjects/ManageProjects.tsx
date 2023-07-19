import React, { useState } from 'react';

import styles from './ManageProjects.module.scss'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import Tabview from '../../components/Tabview/Tabview';




export enum Tab {
  DRAFT_PROJECTS = 'Draft Projects',
  ACTIVE_PROJECTS = 'Active Projects',
  FAVORITE_CONTRACTORS = 'Favorite Contractors'
}


const ActiveProjects = () => {

  return (
    <div className={styles.TabContent}>
      active projects
    </div>
  )
}

const DraftProjects = () => {

  return (
    <div className={styles.TabContent}>
      draft projects
    </div>
  )
}

const FavoriteContractors = () => {

  return (
    <div className={styles.TabContent}>
      favorite contractors
    </div>
  )
}

function ManageProjects() {
  const [ tab, setTab ] = useState(Tab.ACTIVE_PROJECTS);

  return (
    <>
    <Tabview 
        pageTitles={[Tab.DRAFT_PROJECTS, Tab.ACTIVE_PROJECTS, Tab.FAVORITE_CONTRACTORS]} 
        setTab={(tab: Tab) => setTab(tab)}
        tab={tab}
    />
    <div className={styles.ManageProjects}>
      
      
      {tab === Tab.ACTIVE_PROJECTS &&
        <ActiveProjects />
      }
      {tab === Tab.DRAFT_PROJECTS &&
        <DraftProjects />
      }
      {tab === Tab.FAVORITE_CONTRACTORS &&
        <FavoriteContractors />
      }
    </div>
    </>
  );
}

export default ManageProjects;