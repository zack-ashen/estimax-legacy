import { ChangeEvent, FunctionComponent } from 'react';
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
                                                noLabel=false}) => {
    
    const className = `${styles.Input} 
                            ${styles[inputSize]} 
                            ${styles[error ? 'error' : '']}
                            ${styles[valid ? 'valid' : '']}
                            ${styles[type === 'textarea' ? 'textarea' : '']}`

    return type !== "textarea" ? (
        <div className={styles.inputBox}>
            <input
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                onBlur={onBlur}
            />
            {!noLabel && 
                <>
                <label className={`${styles.inputLabel} ${styles[inputSize]}`} htmlFor={name}>{name}</label>
                {error && <p className={styles.errorText}>{error}</p> }
                </>
            }
        </div>
    ) : (
        <div className={styles.inputBox}>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                onBlur={onBlur}
            />
            {!noLabel &&
                <>
                <label className={`${styles.inputLabel} ${styles[inputSize]}`} htmlFor={name}>{name}</label>
                {error && <p className={styles.errorText}>{error}</p> }
                </>
            }
        </div>
    );
};

export default TextInput;