import react, { useState, useEffect } from "react";
import "./index.css";
const format = (value) => {
  return Math.round(value * 100) / 100;
}
export const AttIndicator = (props) => {
  return (
    <div className="root">
      <div className="att-name">{props.name}</div>
      <div className="att-value">{props.value}</div>
      <div className="att-score">{format(props.score)}</div>
      <div className="att-percent">{format(props.percent)}%</div>
    </div>
  );
};
