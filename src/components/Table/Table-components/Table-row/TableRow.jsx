import React from 'react'
import style from './TableRow.module.css'

export function TableRow(props) {
    let firstCell = null
    if (props.rowTitle) {
        firstCell = <div className={style.row}>{props.rowTitle}</div>
    }
    return (
        <>
            {firstCell}
            {props.rowCells}
        </>
    
    )
}