import React from "react";

function SliderHandle({ backgroundColor, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="16" fill={backgroundColor}></circle>
      <path fill={color} d="M8.8 16l5.067 5.429V10.57L8.8 16z"></path>
      <path
        stroke={color}
        d="M13.867 10.286v.285m0 0V21.43L8.8 16l5.067-5.429z"
      ></path>
      <path fill={color} d="M23.733 16l-5.066 5.429V10.57L23.733 16z"></path>
      <path
        stroke={color}
        d="M18.667 10.286v.285m0 0V21.43L23.733 16l-5.066-5.429z"
      ></path>
    </svg>
  );
}

export default SliderHandle;
