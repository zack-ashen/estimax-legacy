import Checkbox from './Checkbox'
import styles from './Checkbox.module.scss'

interface CheckboxSectionProps {
    items: string[];
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
}


export default function CheckboxSection({items, selectedItems, setSelectedItems}: CheckboxSectionProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }

    }


    return (
        <div className={styles.CheckboxSection}>
            {items.map((item, index) => (
                <div className={styles.CheckboxContainer}>
                    <input type='checkbox' className={styles.checkbox} value={item} checked={selectedItems.includes(item)} onChange={(event) => handleChange(event, item)}/>
                    <label htmlFor='label'>{item}</label>
                </div>
            ))}
        </div>
    )
}