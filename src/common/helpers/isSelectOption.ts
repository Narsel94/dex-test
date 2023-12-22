type TOptionTypeNumber = {
  value: number;
  label: string | number;
};

type TOptionTypeString = {
  value: number;
  label: string | number;
};

export const isOptionAndType = (
  obj: unknown,
  type: "string" | "number"
): obj is TOptionTypeString | TOptionTypeNumber => {
  if (typeof obj === "object" && obj !== null) {
    if ("label" in obj && "value" in obj) {
      if (typeof obj.value === "string" && type === "string") {
        return true;
      } else if (typeof obj.value === "number" && type === "number") {
        return true;
      }
    }
  }
  return false;
};

export const isOptionsArrayAndValue = (
  value: unknown,
  type: 'number' | 'string'
): TOptionTypeNumber | TOptionTypeNumber[] | TOptionTypeString| TOptionTypeString [] | null => {
  if (Array.isArray(value)) {
    if (value.every((val) => isOptionAndType(val, "number"))) {
      return value as TOptionTypeNumber[];
    } else if (value.every((val) => isOptionAndType(val, "string"))) {
      return value as TOptionTypeString[];
    }
  } else {
    if (isOptionAndType(value, "number")) {
      return value as TOptionTypeNumber;
    } else  if (isOptionAndType(value, "string")) {
      return value as TOptionTypeString;
    }
  }
  throw new Error('Invalid object or type mismatch');
};

