import { useParams } from 'react-router-dom'
import styles from './Project.module.scss'
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import { Project } from '../../types'


export default function ProjectView() {
  const { id } = useParams();
  const { useAuthReq } = useAuth();
  const authReq = useAuthReq();

  const [ project, setProject ] = useState<Project>()

  useEffect(() => {
    authReq(`/api/project/${id}`, {
      method: 'GET'
    })
      .then(res => res?.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          console.log(data.project);
          setProject(data.project);
        }
      })
  }, [authReq, id])

  return (
    <div className={styles.Project}>
      <h1>{project?.name}</h1>
    </div>
  )
}