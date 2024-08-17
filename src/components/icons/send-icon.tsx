import React from "react";

import { IconsProps } from "./icons-types";

const SendIcon: React.FC<IconsProps> = ({ size = 19, className }) => {
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
        d="M8.37532 9.50003H4.25032M4.18683 9.71865L2.43564 14.9497C2.29806 15.3606 2.22928 15.5661 2.27864 15.6926C2.32151 15.8025 2.41358 15.8858 2.52719 15.9175C2.65802 15.9541 2.85562 15.8651 3.25082 15.6873L15.7844 10.0472C16.1702 9.8736 16.363 9.7868 16.4227 9.66623C16.4744 9.56148 16.4744 9.43857 16.4227 9.33382C16.363 9.21325 16.1702 9.12646 15.7844 8.95288L3.24645 3.31082C2.85244 3.13352 2.65544 3.04486 2.52474 3.08123C2.41124 3.11281 2.31917 3.1959 2.27616 3.30558C2.22662 3.43188 2.29468 3.63691 2.43078 4.04698L4.18732 9.33917C4.21069 9.4096 4.22238 9.44482 4.22699 9.48083C4.23109 9.51279 4.23105 9.54515 4.22687 9.57709C4.22216 9.6131 4.21039 9.64828 4.18683 9.71865Z"
        stroke="#DC4A2D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export { SendIcon };
