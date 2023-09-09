import { useEffect, useState } from 'react'
import styles from './ContractorFeed.module.scss'
import { Contractor } from '../../types';
import ContractorFilter, { ContractorFilters } from '../../components/ContractorFilter/ContractorFilter';
import ContractorCard from '../../components/ContractorCard/ContractorCard';

export default function ContractorFeed() {
    const [contractors, setContractors] = useState<Contractor[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState<ContractorFilters>({
        location: [],
        contractorType: [],
        reviews: []
    })

    useEffect(() => {
        fetch(`/api/contractor/filter/?limit=10&offset=${page * 10}&` + new URLSearchParams({ 
            location: filter.location.join('|'), 
            contractorType: filter.contractorType.join('|'),
            reviews: filter.reviews.join('|')
           }))
            .then((res) => res.json())
            .then((data) => {
                const contractors = data.contractors;
              // If there are no more items, update 'hasMore'
              if (contractors && !contractors.length) {
                setHasMore(false);
              } else if (contractors) {
                // Append new items to the list and increment the page number
                setContractors((prevItems) => [...prevItems, ...contractors]);
                setPage((prevPage) => prevPage + 1);
              }
        });
    }, [page, filter])

    return (
        <div className={styles.ContractorFeed}>
            <ContractorFilter filter={filter} setFilter={setFilter} />

            <div className={styles.contractors}>
                <div className={styles.searchResultsHeader}>
                <p>Found 0 result on your search...</p>
                </div>
            
                <div className={styles.projectGrid}>
                
                {contractors.map((contractor, index) => (
                    <ContractorCard contractor={contractor} />
                ))}
                </div>
            </div>
        </div>
    )
}