import React, { FC, useEffect, useState } from "react";
import Select, { Props } from "react-select";
import classNames from "classnames";
import styles from "./styled-multiselect.module.css";

type TOption = {
  label: string;
  value: string | number;
};

interface StyledSelect extends Omit<Props, "options"> {
  options: TOption[];
  // value:TOption[];
  error?: string;
}

export const StyledMultiselect: FC<StyledSelect> = ({ options, ...rest }) => {
  const [renderValue, setRenderValue] = useState<TOption[]>([]);
  const { onChange } = rest;

  // useEffect(() => {
  //   if (value.length < 3) {
  //     console.log(value)
  //     setRenderValue(value)
  //   } else {
  //     setRenderValue([value[0], value[1], {label: '...', value: value[3].value}])
  //   }
  // }, [value])

  return (
    <Select
      isMulti
      onChange={onChange}
      unstyled
      options={options}
      hideSelectedOptions
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
      }}
    />
  );
};
