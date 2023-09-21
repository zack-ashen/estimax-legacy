
import { useEffect, useState } from 'react'
import MultiSelect from '../Inputs/MultiSelect/MultiSelect'
import { OptionType } from '../../types'

interface LocationSearchProps {
  type: 'cities' | 'address';
  label: string;
  setLocation: React.Dispatch<React.SetStateAction<any>>;
  error?: string;
}

export default function LocationSearch({ type, label, setLocation, error }: LocationSearchProps) {
    const [ search, setSearch ] = useState('')
    const [ locations, setLocations ] = useState<OptionType[]>([])


    useEffect(() => {
      fetch(`/api/map/searchLocation?` + new URLSearchParams({ 
        search,
        type
      }), {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          if (data.locations) {
            const parsedLocations = data.locations.map((location: any) => ( { value: location, label: location.description } ) )
            setLocations(parsedLocations);
          }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
      <MultiSelect 
          options={locations}
          placeholder={label}
          setSelectedOptions={(option) => setLocation(option as string)}
          setInputText={setSearch}
          error={error}
          isClearable
        />
    )
}