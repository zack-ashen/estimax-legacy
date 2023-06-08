import React, { ChangeEvent, FunctionComponent } from 'react';

interface InputProps {
    name: string;
    value: string;
    type?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = ({ name, value, type = "text", placeholder = "", onChange }) => {
    return (
        <input
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;