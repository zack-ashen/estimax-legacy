import styles from './Checkbox.module.scss'

interface CheckboxProps {
    isSelected: boolean;

}


export default function Checkbox({isSelected}: CheckboxProps) {
    return (
        <div className={styles.Checkbox}>
            <input type='checkbox' value='hi' checked={isSelected}/>
            <label htmlFor='label'>Hi</label>
        </div>
    )
}