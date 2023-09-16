import { useState } from 'react';
import styles from './Toggle.module.scss';



type ToggleItem<T> = { 
    [key in keyof T]: string;
};

interface ToggleProps<TI extends ToggleItem<TI>> {
    toggleStates: TI;
    onChange: (toggleItem: TI[keyof TI]) => void;
};


export default function Toggles<TI extends ToggleItem<TI>>({ toggleStates, onChange }: ToggleProps<TI>) {
    const enumKeys = Object.keys(toggleStates) as Array<keyof TI>;
    const [activeToggle, setActiveToggle] = useState<TI[keyof TI]>(toggleStates[enumKeys[0]]);

    const handleClick = (key: keyof TI) => {
        setActiveToggle(toggleStates[key]);
        onChange(toggleStates[key]);
    };

    return (
        <div className={styles.ToggleContainer}>
            {enumKeys.map((key, index) => (
                <button 
                    className={`${styles.toggle} ${styles[activeToggle === toggleStates[key] ? 'active' : 'disabled']}`} 
                    value={toggleStates[key]} 
                    onClick={() => handleClick(key)}
                    key={index}>
                        {toggleStates[key]}
                </button>
            ))}
        </div>
    );
}