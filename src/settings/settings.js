// Common
export const borderWidth = 1
export const border = `${borderWidth}px solid black`

export function borderMix(borderWidth='1px',
                          borderStyle='solid',
                          borderColor='black') {
    return `${borderWidth} ${borderStyle} ${borderColor}`
}

export const displayFlexAlignCenter = 'display: flex; align-items: center'

/*
0-100 - class elements on one layer (warnings elements)
100-200
---------------------------
500 - rent elements
500 - today marker
505 - btn in table header
1000 - modal
 */
export const zIndex = 100

// Colors
export const weekendColor = 'lightblue'
export const btnColor = '#0277bd'
export const menuItemColor = '#9feaab'
export const secondaryColor = 'lightseagreen'
export const MainBgColor = '#d5d5d57f'
export const selectionColor = '#e2c50a'


// TableWrapper = styled.div on src/components/Table/Table.jsx
export const gridColumnsWidth = 50
export const gridAutoRowsHeight = 40
export const gridTemplateFirstColumnWidth = '250px'

