import { ChangeEvent, FunctionComponent, ReactElement, SVGProps, useState } from 'react';
import styles from './TextInput.module.scss';


export enum TextInputSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

interface TextInputProps {
    name: string;
    value: string;
    type?: string;
    placeholder?: string;
    inputSize?: TextInputSize;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    valid?: boolean
    onBlur?: () => void;
    Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    noLabel?: boolean;
}

const TextInput: FunctionComponent<TextInputProps> = ({ name, 
                                                value, 
                                                type = "text", 
                                                placeholder = " ", 
                                                onChange,
                                                inputSize=TextInputSize.MEDIUM,
                                                error,
                                                valid,
                                                onBlur,
                                                Icon,
                                                noLabel=false}) => {
    
    const [focused, setFocused] = useState(false);
    const className = `${styles.Input} 
                            ${styles[inputSize]} 
                            ${styles[error ? 'error' : '']}
                            ${styles[valid ? 'valid' : '']}
                            ${styles[type === 'textarea' ? 'textarea' : '']}
                            ${styles[Icon ? 'withIcon' : '']}`

    return type !== "textarea" ? (
        <div className={styles.inputBox}>
            {!noLabel && 
                <label className={`${styles.inputLabel} ${styles[inputSize]} ${styles[focused ? 'focused' : '']}`} htmlFor={name}>{name}</label>
            }
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                onFocus={() => setFocused(true)}
                onBlur={() => {setFocused(false); onBlur && onBlur()}}
            />
            {Icon && <Icon className={styles.icon}/>}
            {error && <p className={styles.errorText}>{error}</p> }
        </div>
    ) : (
        <div className={styles.inputBox}>
            {!noLabel &&
                <label className={`${styles.inputLabel} ${styles[inputSize]} ${styles[focused ? 'focused' : '']}`} htmlFor={name}>{name}</label>
            }
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                onFocus={() => setFocused(true)}
                onBlur={() => {setFocused(false); onBlur && onBlur()}}
            />
            {error && <p className={styles.errorText}>{error}</p> }
        </div>
    );
};

export default TextInput;