import react, { useState, useEffect } from "react";
import "./index.css";
export const AttIndicator = (props) => {
  return (
    <div className="root" >
      <div className="att-name">{props.name}</div>
      <div className="att-value">{props.value}</div>
      {/* <div className="att-rarity">{props.rarity}</div> */}
    </div>
  );
};
