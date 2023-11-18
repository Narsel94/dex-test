import React, { FC } from "react";
import Select, { Props } from "react-select";
import styles from "./styled-multiselect.module.css";

type TOption = {
  label: string;
  value: string | number;
};

interface StyledSelect extends Omit<Props, "options"> {
  options: TOption[];
  value?: any;
  error?: string;
}

export const StyledMultiselect: FC<StyledSelect> = ({
  value,
  options,
  ...rest
}) => {
  const { onChange } = rest;

  return (
    <Select
      isMulti
      onChange={onChange}
      value={value}
      unstyled
      options={options}
      classNames={{
        container: () => styles.container,
        menuList: () => styles.group,
        indicatorSeparator: () => styles.indicator,
        dropdownIndicator: () => styles.dropdownIndicator,
        indicatorsContainer: () => styles.indicatorsContainer,
        clearIndicator: () => styles.clearIndicator,
        option: () => styles.option,
        multiValue: () => styles.multiValue,
        valueContainer: () => styles.val,
        input: () => styles.input,
        placeholder: () => styles.placeholder,
      }}
      {...rest}
    />
  );
};
