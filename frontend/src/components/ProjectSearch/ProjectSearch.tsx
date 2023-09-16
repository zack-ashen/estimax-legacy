
import TextInput from '../Inputs/TextInput/TextInput';
import styles from './ProjectSearch.module.scss';


import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';


interface ProjectSearchCardProps { 
    project: Project;
}

const ProjectSearchCard = ({ project }: ProjectSearchCardProps) => {
    const navigate = useNavigate();

    const goToProject = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate(`/project/${project._id}`)

        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <div className={styles.ProjectSearchCard} onClick={goToProject}>
            <div className={styles.cardDetails}>
                <p className={styles.name}>{project.name}</p>
                <p className={styles.location}>{project.location}</p>
            </div>

            <p className={styles.bidCount}>
                {project.bids.length} Bids
            </p>
        </div>
    )
}


export default function ProjectSearch() {
    const [ search, setSearch ] = useState('');
    const [ projects, setProjects ] = useState<Project[]>([])

    const [ focused, setFocused ] = useState(false);
    const [ showDropdownOverride, setShowDropdownOverride ] = useState(false);

    const { useAuthReq } = useAuth();
    const authReq = useAuthReq();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdownOverride(false);
        } else {
            setShowDropdownOverride(true);
        }
    }

    useEffect(() => {
        if (search !== '') {
            authReq(`/api/project/search/?name=${search}&limit=5`, {
                method: 'GET'
            })
                .then(res => res?.json())
                .then(data => {
                    if (data.projects.length >= 1) {
                        setProjects(data.projects)
                    }
                })
        }
    }, [search])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div className={`${styles.ProjectSearch} ${styles[focused ? 'focused' : 'notFocused']}`} ref={dropdownRef}>
            <TextInput 
                name='Search' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                Icon={SearchIcon} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                noLabel/>
            {((showDropdownOverride || (projects.length !== 0 && focused)) && search !== '') &&
            <div className={styles.resultsContainer}>
                {projects.map((project, index) => (
                    <ProjectSearchCard project={project} key={index} />
                ))}
            </div>
            }
        </div>
    );
}