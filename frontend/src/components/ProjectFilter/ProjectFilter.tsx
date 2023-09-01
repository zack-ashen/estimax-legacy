import CheckboxSection from "../Inputs/CheckboxSection/CheckboxSection";
import { Locations, Prices, Timeline } from "../../types";
import Slider from "../Inputs/Slider/Slider";
import Filter, { FilterSection } from "../Filter/Filter";

export interface ProjectFilters {
    location: string[],
    currentPrice: string,
    timeline: string
}

interface ProjectFilterProps {
    filter: ProjectFilters
    setFilter: React.Dispatch<React.SetStateAction<ProjectFilters>>;
}

export default function ProjectFilter({ filter, setFilter }: ProjectFilterProps) {
    const reset = () => {
        setFilter({
            location: [],
            currentPrice: '',
            timeline: ''
        });
    }

    const setLocation = (locations: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            location: locations
        }))
    }

    return (
        <Filter reset={reset}>
            <FilterSection title={'Locations'}>
                <CheckboxSection items={Object.values(Locations)} selectedItems={filter.location} setSelectedItems={setLocation}/>
            </FilterSection>
            <FilterSection title={'Current Price'}>
                <Slider sliderStates={Object.values(Prices)} label={''} setUpstreamState={((state) => setFilter(prevFilter => ({
                    ...prevFilter,
                    currentPrice: state
                })))} />
            </FilterSection>
            <FilterSection title={'Timeline'}>
                <Slider sliderStates={Object.values(Timeline)} label={''} setUpstreamState={((state) => setFilter(prevFilter => ({
                    ...prevFilter,
                    timeline: state
                })))} />
            </FilterSection>
            <FilterSection title={'Activity'}>
                Activity
            </FilterSection>
        </Filter>
    )
}