import CheckboxSection from "../Inputs/CheckboxSection/CheckboxSection";
import { ContractorTypes, Locations, Prices, ReviewStars, Timeline, contractorTypes } from "../../types";
import Slider from "../Inputs/Slider/Slider";
import Filter, { FilterSection } from "../Filter/Filter";

export interface ContractorFilters {
    location: string[],
    contractorType: string[],
    reviews: string[]
}

interface ContractorFilterProps {
    filter: ContractorFilters
    setFilter: React.Dispatch<React.SetStateAction<ContractorFilters>>;
}

export default function ContractorFilter({ filter, setFilter }: ContractorFilterProps) {
    const reset = () => {
        setFilter({
            location: [],
            contractorType: [],
            reviews: []
        });
    }

    const setLocation = (locations: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            location: locations
        }))
    }

    const setContractorTypes = (contractorTypes: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            contractorType: contractorTypes
        }))
    }

    const setReviews = (reviews: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            reviews: reviews
        }))
    }

    return (
        <Filter reset={reset}>
            <FilterSection title={'Locations'}>
                <CheckboxSection items={Object.values(Locations)} selectedItems={filter.location} setSelectedItems={setLocation}/>
            </FilterSection>
            <FilterSection title={'Contractor Type'}>
                <CheckboxSection items={Object.values(ContractorTypes)} selectedItems={filter.contractorType} setSelectedItems={setContractorTypes}/>
            </FilterSection>
            <FilterSection title={'Reviews'}>
                <CheckboxSection items={Object.values(ReviewStars)} selectedItems={filter.reviews} setSelectedItems={setReviews}/>
            </FilterSection>
        </Filter>
    )
}