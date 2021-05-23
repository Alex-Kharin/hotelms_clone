import style from "./TableCell.module.css";
import React from "react";

export function TableCell(props) {
    return (
        <div className={style.cell} data-date={props.date} style={props.style}>
            <span>{props.dayOfMonth}</span>
            <br/>
            <span>{props.dayOfWeek}</span>
        </div>
    )
}