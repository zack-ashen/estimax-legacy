import { PropsWithChildren } from 'react';
import styles from './EditableText.module.scss';
import TextInput from '../Inputs/TextInput/TextInput';

interface EditableTextProps extends PropsWithChildren{
    editMode: boolean;
    optional?: boolean;
    textValue: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditableText({ editMode, textValue, setValue, children, optional=false }: EditableTextProps) {

    return editMode ? (
        <TextInput value={textValue} onChange={(e) => setValue(e.target.value)} name={'editable text'} noLabel />
    ) : (
        <>{children}</>
    )
}