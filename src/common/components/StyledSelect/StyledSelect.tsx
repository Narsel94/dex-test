import React, { FC } from "react";
import Select, { Props } from "react-select";
import classNames from "classnames";
import styles from "./StyledSelect.module.css";

type TOption = {
  label: string | number;
  value: string | number;
};

interface StyledSelect extends Omit<Props, "options"> {
  options: TOption[];
  small?: true;
  isMulti?: boolean;
  error?: string;
}

export const StyledSelect: FC<StyledSelect> = React.forwardRef<
  HTMLDivElement,
  StyledSelect
>(
  (
    {
      error,
      small,
      isSearchable,
      menuPlacement,
      isMulti,
      options,
      ...props
    },
    ref
  ) => {
    const placeholderClasses = classNames(styles.inputPlaceholder, {
      [styles.isMultiPlaceholder]: isMulti,
      [styles.isSinglePlaceholder]: !isMulti,
    });

    const containerClasses = classNames(styles.container, {
      [styles.default]: !small,
      [styles.small]: small,
      [styles.invalid]: !!error,
      [styles.multi]: isMulti,
    });

    const wrapperClasses = classNames(styles.wrapper, {
      [styles.default]: !small,
      [styles.small]: small,
    });

    const valueContainerClasses = classNames({
      [styles.valueContainer]: !isMulti,
      [styles.multiValueContainer]: isMulti,
      [styles.valueContainerDefault]: !small,
    });

    const indicatorsClasses = classNames(styles.indicators, {
      [styles.indicatorBig]: !small,
    });

    const controlClasses = classNames({
      [styles.controlDefault]: !small,
      [styles.control]: small,
    });

    return (
      <div className={wrapperClasses}>
        <Select
          unstyled
          isMulti={isMulti}
          menuPlacement={menuPlacement}
          defaultValue={small ? options[0] : undefined}
          options={options}
          isClearable={!small}
          isSearchable={isSearchable}
          classNames={{
            control: () => controlClasses,
            container: () => containerClasses,
            indicatorsContainer: () => indicatorsClasses,
            valueContainer: () => valueContainerClasses,
            multiValue: () => styles.multiValue,
            menuList: () => styles.group,
            singleValue: () => styles.singleValue,
            option: ({ isSelected }) =>
              isSelected ? styles.selectedOption : styles.option,
            indicatorSeparator: () => styles.indicator,
            clearIndicator: () => styles.clearIndicator,
            input: () => styles.input,
            placeholder: () => placeholderClasses,
          }}
          {...props}
        />
        {error && <p className={styles.errorMessage}>{error || ""}</p>}
      </div>
    );
  }
);
