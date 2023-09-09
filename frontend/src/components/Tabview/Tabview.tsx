import { useState } from 'react';
import styles from './Tabview.module.scss';

// Define a generic Enum type that represents a string-based enum
type Tabs = Record<string, string>;

// Make TabviewProps generic
interface TabviewProps<T extends Tabs> {
    pageTitles: string[];
    setTab: (tab: T[keyof T]) => void;
    tab: T[keyof T];
}

// Make the component generic
export default function Tabview<T extends Tabs>({ pageTitles, setTab, tab }: TabviewProps<T>) {
    const [currentPage, setCurrentPage] = useState<string>(tab);

    const switchTabs = (title: string) => {
        pageTitles.forEach((page, index) => {
            if (page === title) {
                setCurrentPage(title);
                setTab(pageTitles[index] as T[keyof T]);
            }
        });
    };

    return (
        <>
            <div className={styles.Tabview}>
                <h5>{currentPage}</h5>
                <div className={styles.tabs}>
                    {pageTitles.map((title, index) => (
                        <button 
                            onClick={() => switchTabs(title)} 
                            className={`${styles.tabButton} ${styles[currentPage === title ? 'activeTab' : '']}`}
                            key={index}>{title}</button>
                    ))}
                    <div className={styles.divider} />
                </div>
            </div>
            <div className={styles.divider} />
        </>
    );
}