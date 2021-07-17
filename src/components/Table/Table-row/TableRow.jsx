import React from 'react'


export function TableRow({rowTitle, rowCells}) {
    let firstCell

    if (rowTitle) {
        if (typeof rowTitle === 'object') {
            firstCell = rowTitle
        } else {
            firstCell = <div>{rowTitle}</div>
        }
    }

    return (
        <>
            {firstCell} {rowCells}
        </>
    
    )
}