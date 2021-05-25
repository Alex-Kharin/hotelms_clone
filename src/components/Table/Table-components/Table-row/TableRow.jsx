import React from 'react'



export function TableRow(props) {
    const firstCell = props.rowTitle ? <div>{props.rowTitle}</div> : null
   
    return (
        <>
            {firstCell}
            {props.rowCells}
        </>
    
    )
}