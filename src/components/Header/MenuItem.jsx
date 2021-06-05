import React from 'react'
import style from './MenuItem.module.css'



export function MenuItem(props) {
    return (
        <div className={style.menuItemWrapper + ' ' + style.my2} onClick={props.onClick}>
            <span className={'material-icons' + ' ' + style.my5}>{props.iconName}</span>
            {props.children && <span className={style.mr5}>{props.children}</span>}
        </div>
    )
}