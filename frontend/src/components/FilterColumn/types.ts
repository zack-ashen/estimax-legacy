import { ComponentType } from "react";

export interface FilterComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FilterObject {
  [key: string]: {
    name: string;
    component: ComponentType<FilterComponentProps>;
  };
}

export interface FiltersState {
  [key: string]: string;
}
