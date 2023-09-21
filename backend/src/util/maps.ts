import { AddressComponent, AddressType, Client, LatLngBounds, PlaceAutocompleteResult, PlaceAutocompleteType, PlaceDetailsResponse } from "@googlemaps/google-maps-services-js";
import { Location } from "../models/location";

const googleMapsClient = new Client({});


export const locationAutocomplete = async (type: string, search: string) => {
    const response = await googleMapsClient.placeAutocomplete({
        params: {
            input: search,
            key: process.env.GOOGLE_MAPS_API!,
            components: ['country:us'],
            types: type === 'cities' ? PlaceAutocompleteType.cities : PlaceAutocompleteType.address
        },
    });

    return response.data;
}

export const parseLocationData = async (locationData: PlaceAutocompleteResult) : Promise<Omit<Location, 'unit'>> => {
    const locationInfo = await googleMapsClient.placeDetails({
        params: {
            key: process.env.GOOGLE_MAPS_API!,
            place_id: locationData.place_id
        }
    })

    const res = locationInfo.data.result;

    if (!res)
        throw new Error('No location found');

    if (!res.geometry)
        throw new Error('No geometry found');


    const { lat, lng } = res.geometry.location;
    const placeId = locationData.place_id;
    const addressLine1 = locationData.structured_formatting.main_text;
    const addressLine2 = locationData.structured_formatting.secondary_text;

    if (!res.address_components)
        throw new Error('No address components found');

    let postalCode : string | undefined;

    let area : [string, string] = ['', ''];
    for (const adrComponent of res.address_components) {
        const types = adrComponent.types;

        if (!area[0] && types.some(type => type === AddressType.locality || type === AddressType.administrative_area_level_3 || type === AddressType.sublocality)) {
            area[0] = adrComponent.short_name;
        }

        if (types.includes(AddressType.administrative_area_level_1)) {
            area[1] = adrComponent.short_name;
        }

        if (types.includes(AddressType.postal_code)) {
            postalCode = adrComponent.short_name;
        }

        // If you have found all the required types, break out of the loop
        if (area[0] && area[1] && postalCode) break;
    }

    const finalLocationInfo = {
        address: {
            addressLine1,
            addressLine2,
            postalCode
        },
        area: area[0] + ', ' + area[1],
        point: [lng, lat] as [number, number],
        placeId
    }

    return finalLocationInfo
}

export const parseLocationAreaData = async (locationAreaData: PlaceAutocompleteResult) => {
    const locationInfo = await googleMapsClient.placeDetails({
        params: {
            key: process.env.GOOGLE_MAPS_API!,
            place_id: locationAreaData.place_id
        }
    })

    const res = locationInfo.data.result;

    if (!res)
        throw new Error('No location found');

    if (!res.geometry)
        throw new Error('No geometry found');


    const viewport = res.geometry.viewport;
    const region = {
        type: 'Polygon',
        coordinates: viewportToPolygon(viewport)
    }

    const name = res.name?.slice(0, -1);

    return {
        name,
        region,
        placeId: locationAreaData.place_id
    }
}

function viewportToPolygon(viewport: LatLngBounds): number[][] {
    const { southwest, northeast } = viewport;

    const northwest = { lat: northeast.lat, lng: southwest.lng };
    const southeast = { lat: southwest.lat, lng: northeast.lng };

    return [
        [southwest.lng, southwest.lat],  // Southwest
        [southeast.lng, southeast.lat],  // Southeast
        [northeast.lng, northeast.lat],  // Northeast
        [northwest.lng, northwest.lat],  // Northwest
        [southwest.lng, southwest.lat]   // Close the loop by returning to Southwest
    ];
}