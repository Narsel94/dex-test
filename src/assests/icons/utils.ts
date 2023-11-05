import { colors} from '../../common/constants/constants';

export type TIconTypes = "primary" | "secondary" | "close";

export type TIconProps = {
  type: TIconTypes;
  color?: string;
  size?: number;
};

export const getIconColor = (type: TIconTypes) => {
  return `${
    type === "primary"
      ? colors.LIGHT_GREY
      : type === "secondary"
      ? colors.RED
      : type === "close"
      ? colors.LIGHTEST_RED
      : colors.LIGHTEST_GREY
  }`;
};
