import React, { FC } from "react";
import Select, { Props } from "react-select";
import { InvalidMessage } from "../exports";
import classNames from "classnames";
import styles from "./styled-select.module.css";

interface StyledSelect extends Props {
  options: any;
  error?: string 
}

export const StyledSelect: FC<StyledSelect> = React.forwardRef<
  HTMLDivElement,
  StyledSelect
>(({ error, options, ...props }, ref) => {

  const containerClasses = classNames(styles.container, {
    [styles.invalid]: !!error
  })

  return (
    <div className={styles.wrapper}>
      <Select
        
        unstyled
        options={options}
        isClearable
        isSearchable
        classNames={{
          container: () => containerClasses,
          indicatorsContainer: () => styles.indicators,
          valueContainer: () => styles.valueContainer,
          menuList: () => styles.group,
          option: ({ isSelected }) =>isSelected ? styles.selectedOption : styles.option,
          indicatorSeparator: () => styles.indicator,
          clearIndicator: () => styles.clearIndicator,
          input: () => styles.input,
          placeholder: () => styles.inputPlaceholder,
        }               
      }
        {...props}
      />
      <InvalidMessage message={error}/>
    </div>
  );
});