export interface Location {
  area: string;
  address: Address;
  point: [number, number]; // long and lat
  placeId: string;
}

export interface LocationArea {
  name: string;
  region: {
    type: "Polygon";
    coordinates: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ];
  };
  placeId: string;
}

export interface Address {
  unit?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode?: string;
}
