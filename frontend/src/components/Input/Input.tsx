import React, { ChangeEvent, FunctionComponent } from 'react';
import styles from './Input.module.scss';


export enum InputSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

interface InputProps {
    name: string;
    value: string;
    type?: string;
    placeholder?: string;
    inputSize?: InputSize;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = ({ name, 
                                                value, 
                                                type = "text", 
                                                placeholder = " ", 
                                                onChange, 
                                                inputSize=InputSize.MEDIUM}) => {
    
    return (
        <div className={styles.inputBox}>
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={`${styles.Input} ${styles[inputSize]}`}
            />
            <label className={`${styles.inputLabel} ${styles[inputSize]}`} htmlFor={name}>{name}</label>
        </div>
    );
};

export default Input;