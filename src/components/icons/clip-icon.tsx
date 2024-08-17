import React from "react";

import { IconsProps } from "./icons-types";

const ClipIcon: React.FC<IconsProps> = ({ size = 19, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16.3644 8.67462L9.60265 15.4363C8.06496 16.974 5.57188 16.974 4.03419 15.4363C2.4965 13.8986 2.4965 11.4056 4.03419 9.86786L10.7959 3.10616C11.821 2.08103 13.4831 2.08103 14.5082 3.10616C15.5333 4.13128 15.5333 5.79334 14.5082 6.81847L8.01166 13.315C7.4991 13.8276 6.66807 13.8276 6.15551 13.315C5.64294 12.8024 5.64294 11.9714 6.15551 11.4589L11.8566 5.75781"
        stroke="#DC4A2D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { ClipIcon };
