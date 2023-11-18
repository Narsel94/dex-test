import React, { FC } from "react";
import Select, { Props } from "react-select";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import styles from "./styled-count-select.module.css";

interface IPageSelect extends Omit<Props, "options"> {
  options: any[];
}

export const CountSelect: FC<IPageSelect> = React.forwardRef<
  HTMLDivElement,
  IPageSelect
>(({  options, ...props }, ref) => {
  const isMobile = useMobileMediaQuery()

  return <Select {...props} 
  options={options} 
  defaultValue={options[0]}
  unstyled
  menuPlacement="top" 
  isClearable={false}
  isSearchable={false}
  classNames={{
    container: () => styles.container,
    menuList: () => styles.menuList,
    option: ({isSelected}) => isSelected? styles.optionActive : styles.option,
    control:() => styles.control, 
    indicatorSeparator: () => styles.indicator,
    dropdownIndicator:() =>styles.dropdownIndicator
  }}
  />;
});

export const MemoCountSelect = React.memo(CountSelect)
