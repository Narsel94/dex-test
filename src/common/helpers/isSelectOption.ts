type TOptionType = {
  value: string | number;
  label: string | number;
};

type TOptionTypeNumber = {
  value: number;
  label: string | number;
};

export const isSingleSelectOption = (obj: unknown): obj is TOptionType => {
  if (typeof obj === "object" && obj !== null) {
    return "label" in obj && "value" in obj;
  }
  return false;
};

export const isOptionsArrayAndValueNumber = (
  value: unknown
): TOptionTypeNumber | TOptionTypeNumber[] | null => {
  if (Array.isArray(value)) {
    if (
      value.every(isSingleSelectOption) &&
      value.every((val) => typeof val.value === "number")
    )
      return value as TOptionTypeNumber[];
  } else {
    if (isSingleSelectOption(value) && typeof value.value === "number") {
      return value as TOptionTypeNumber;
    }
  }
  return null;
};
