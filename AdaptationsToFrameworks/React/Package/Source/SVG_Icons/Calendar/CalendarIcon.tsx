import React from "react";
import type SVG_IconComponent from "../SVG_IconComponent";


const CalendarIcon: SVG_IconComponent = ({ className }: SVG_IconComponent.Properties): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 20"
    className={ className }
  >
    <path d="M16 2h-1V0h-2v2H5V0H3v2H2a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 16H2V8h14v10ZM6 12H4v-2h2v2Zm4 0H8v-2h2v2Zm4 0h-2v-2h2v2Zm-8 4H4v-2h2v2Zm4 0H8v-2h2v2Zm4 0h-2v-2h2v2Z"/>
  </svg>
);


export default CalendarIcon;
