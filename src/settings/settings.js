// Common
export const borderWidth = 1
export const border = `${borderWidth}px solid black`

export function borderMix(borderWidth='1px',
                          borderStyle='solid',
                          borderColor='black') {
    return `${borderWidth} ${borderStyle} ${borderColor}`
}

export const displayFlexAlignCenter = 'display: flex; align-items: center'


// Z-indexes:
export const todayMarkerZIndex = 500
export const rentElementsZIndex = 450
export const btnHeaderZIndex = 505
// 1000 - modal in src/components/Modal/SettingsMenuItem.module.css

// Colors
export const weekendColor = 'lightblue'
export const btnColor = '#0277bd'
export const menuItemColor = '#9feaab'
export const secondaryColor = 'lightseagreen'
export const MainBgColor = '#d5d5d57f'
export const selectionColor = '#e2c50a'
export const rentElementColor = '#00c0e7'


// TableWrapper = styled.div on src/components/Table/Table.jsx
export const gridColumnsWidth = 50
export const gridAutoRowsHeight = 40
export const gridTemplateFirstColumnWidth = '250px'


// **************************************************************** //
export const time = {hours:12, minutes:0, seconds:0, milliseconds:0}
export const tariffs = {
    standard: 1000,
    comfortable: 2000,
    lux: 5000
}
