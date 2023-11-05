import { TIconProps, getIconColor } from "./utils";

export const IconDelete = ({ size, type }: TIconProps) => {
  return (
    <svg
      width={size?.toString() || "24"}
      height={size?.toString() || "24"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="delete">
        <path
          id="delete_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3333 2.66667H11.9999C12.3666 2.66667 12.6666 2.96667 12.6666 3.33333C12.6666 3.7 12.3666 4 11.9999 4H3.99992C3.63325 4 3.33325 3.7 3.33325 3.33333C3.33325 2.96667 3.63325 2.66667 3.99992 2.66667H5.66659L6.13992 2.19333C6.25992 2.07333 6.43325 2 6.60659 2H9.39325C9.56659 2 9.73992 2.07333 9.85992 2.19333L10.3333 2.66667ZM5.33325 14C4.59992 14 3.99992 13.4 3.99992 12.6667V6C3.99992 5.26667 4.59992 4.66667 5.33325 4.66667H10.6666C11.3999 4.66667 11.9999 5.26667 11.9999 6V12.6667C11.9999 13.4 11.3999 14 10.6666 14H5.33325Z"
          fill={getIconColor(type)}
        />
      </g>
    </svg>
  );
};
