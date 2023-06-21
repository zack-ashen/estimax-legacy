import React, { useState } from 'react';
import Select from 'react-select';
import { CSSObjectWithLabel, ControlProps, GroupBase, MultiValue, ActionMeta } from 'react-select'
import { OptionType } from '../../types/index'

import styles from './MultiSelect.module.scss'

interface MultiSelectProps {
  options: MultiValue<OptionType>;
  placeholder: string;
  isMulti?: true | undefined;

}

const MultiSelect = ({ options, placeholder, isMulti=true }: MultiSelectProps) => {
  // Define a state variable to store the selected options
  const [selectedOption, setSelectedOption] = useState<MultiValue<OptionType>| null>(null);
  const [selectIsFocused, setSelectIsFocused] = useState(false);

  // Handle changes in the selection
  const handleChange = (option: MultiValue<OptionType> | null, actionMeta: ActionMeta<OptionType>) => {
    setSelectedOption(option);
  };

  const labelState = selectIsFocused ? 'focused' : (selectedOption !== null && selectedOption.length !== 0 ? 'focused' : '');

  return (
    <div className={styles.MultiFormContainer}>
      <Select
        isMulti={undefined}
        name="colors"
        options={options}
        className={styles.MultiSelect}
        value={selectedOption}
        onChange={handleChange}
        onFocus={() => setSelectIsFocused(true)}
        onBlur={() => setSelectIsFocused(false)}
        placeholder={''}
        styles={{
          control: (provided: CSSObjectWithLabel, state: ControlProps<OptionType, true, GroupBase<OptionType>>) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: '#D0D5DD', // colors depending on the focus state
            borderWidth: '1px', // Set a fixed border width
            borderRadius: '0.5rem',
            width: '100%',
            cursor: 'text',
            boxSizing: 'border-box',
            boxShadow: state.isFocused ? '0px 0px 0px 3px #EBEFFF' : '0px 1px 2px rgba(16, 24, 40, 0.05)', // Moved outline to boxShadow
            padding: '0.247rem 0.5rem',
            margin: '0px 0',
            outline: 'none', // Removed outline
            '&:hover:not(:focus)': {
              borderColor: '#D0D5DD', // border color when hovered
            },
            '> :last-child': {
              color: '#98A2B3',

              '> :first-of-type, > :last-of-type': {
                cursor: 'pointer'
              }
            }
          }),
          multiValue: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: '#F8F9FC',
            borderRadius: '0.4rem',
            color: '#1D2939',
            border: '1px solid #BBC8FB',
            fontWeight: '500',
            padding: '0.1rem 0.8rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            '> :last-child': {
              cursor: 'pointer',
              width: '1.3rem',
              height: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0.2rem',
              '&:hover': {
                backgroundColor: '#F04438',
                color: '#FFFFFF'
              }
            }
          }),
          menu: (base: CSSObjectWithLabel) => ({
            ...base,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            marginTop: '0.7rem',
            border: '1px solid #D0D5DD',
            boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
            width: '75%',
            cursor: 'pointer'
          }),

          option: (base, state) => ({
            ...base,
            // This will change the background when an option is being hovered or in focus
            backgroundColor: state.isFocused ? '#F2F4F7' : '#FFFFFF',
            color: '#344054',
            cursor: 'pointer',
            width: '95%',
            margin: '0.7rem auto',
            borderRadius: '0.4rem',
            fontSize: '0.9rem',
            padding: '0.6rem 1.25rem',
            fontWeight: state.isFocused ? '600' : '500'
          }),
        }}
      />
      <label className={`${styles.inputLabel} ${styles[labelState]}`} htmlFor={placeholder}>{placeholder}</label>
    </div>
  );
};

export default MultiSelect;