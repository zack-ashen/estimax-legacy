interface LocationSearchResponse {
    locations: [{
        place_id: number
        description: string
    }]
}

export const locationSearch = async (search: string, type: 'cities' | 'address') : Promise<LocationSearchResponse> => {
    const response = await fetch(`/api/map/searchLocation?` + new URLSearchParams({ 
        search,
        type
      }), {
        method: 'GET',
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Error fetching locations:', data.error);
        throw new Error(data.error || 'An unknown error occurred');
      }

      return data;
}