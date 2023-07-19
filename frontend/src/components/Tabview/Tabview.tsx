import { useState } from 'react';
import styles from './Tabview.module.scss'
import { Tab } from '../../pages/ManageProjects/ManageProjects';


interface TabviewProps {
    pageTitles: string[];
    setTab: (tab: Tab) => void;
    tab: Tab;
}

export default function Tabview({ pageTitles, setTab, tab }: TabviewProps) {
    const [ currentPage, setCurrentPage ] = useState(tab as string);

    const switchTabs = (title: string) => {
        pageTitles.forEach((page, index) => {
            if (page === title) {
                setCurrentPage(title)
                setTab(pageTitles[index] as Tab);
            }
        })
    }

    return (
        <>
        <div className={styles.Tabview}>
            <h5>{currentPage}</h5>
            <div className={styles.tabs}>
                {pageTitles.map((title, index) => (
                    <button onClick={() => switchTabs(title)} className={`${styles.tabButton} ${styles[currentPage === title ? 'activeTab' : '']}`}>{title}</button>
                ))}
                <div className={styles.divider} />
            </div>
        </div>
        <div className={styles.divider} />
        </>
    )
}