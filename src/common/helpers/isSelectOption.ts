type TOptionType = {
  value: string | number;
  label: string | number;
};
export const isSingleSelectOption = (obj: unknown): obj is TOptionType => {
  if (typeof obj === "object" && obj !== null) {
    return "label" in obj && "value" in obj;
  }

  return false;
};

export const isSelectOptions = (
  obj: unknown
): { isArray: boolean; isOption: boolean } => {
  if (Array.isArray(obj)) {
    return { isOption: obj.every(isSingleSelectOption), isArray: true };
  } else {
    return { isOption: isSingleSelectOption(obj), isArray: false };
  }
};
