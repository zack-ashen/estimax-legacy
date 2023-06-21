import React, { ChangeEvent, FunctionComponent, useRef } from 'react';
import styles from './Input.module.scss';
import useAutosizeTextArea from '../../hooks/useAutoresizeTextArea';


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
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    valid?: boolean
    onBlur?: () => void;
}

const Input: FunctionComponent<InputProps> = ({ name, 
                                                value, 
                                                type = "text", 
                                                placeholder = " ", 
                                                onChange,
                                                inputSize=InputSize.MEDIUM,
                                                error,
                                                valid,
                                                onBlur}) => {
    
    const inputClass = `${styles.Input} 
                        ${styles[inputSize]} 
                        ${styles[error ? 'error' : '']}
                        ${styles[valid ? 'valid' : '']}
                        ${styles[type === 'textarea' ? 'textarea' : '']}`

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, value);

    return type !== "textarea" ? (
        <div className={styles.inputBox}>
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={inputClass}
                onBlur={onBlur}
            />
            <label className={`${styles.inputLabel} ${styles[inputSize]}`} htmlFor={name}>{name}</label>
            {error && <p className={styles.errorText}>{error}</p> }
        </div>
    ) : (
        <div className={styles.inputBox}>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={inputClass}
                onBlur={onBlur}
                ref={textAreaRef}
            />
            <label className={`${styles.inputLabel} ${styles[inputSize]}`} htmlFor={name}>{name}</label>
            {error && <p className={styles.errorText}>{error}</p> }
        </div>
    );
};

export default Input;