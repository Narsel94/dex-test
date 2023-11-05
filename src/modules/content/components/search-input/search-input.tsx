import React, {
  forwardRef,
  useRef,
  useState,
  useCallback,
} from "react";
import { useCombinedRefs } from "../../../../common/helpers/use-combine-refs";
import styles from "./search-input.module.css";

type TSearchInput = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
};

export const SearchInput = forwardRef<HTMLInputElement, TSearchInput>(
  (
    { value, placeholder = "Search...", onChange, onBlur, onFocus, ...rest },
    forwardedRef
  ) => {
    const [focus, setFocus] = useState(false);
    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useCombinedRefs<HTMLInputElement>(innerRef, forwardedRef);

    const handleInputBlur = useCallback(
      (e?: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        if (typeof onBlur === "function") {
          onBlur(e);
        }
      },
      [setFocus, onBlur]
    );
    const handleInputFocus = useCallback(
      (e?: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
        if (typeof onFocus === "function") {
          onFocus(e);
        }
      },
      [setFocus, onFocus]
    );
    

    return (
      <div className={styles.customInput}>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={onChange}
          ref={ref}
          type="text"
          value={value}
          className={styles.input}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

