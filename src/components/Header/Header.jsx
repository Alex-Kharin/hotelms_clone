import React from 'react'
import style from './Header.module.css'
import {MenuItem} from './MenuItem'


export function Header(props) {
    return (
        <header className={style.header}>

            <div className={style.leftSideMenu}>
                <span className={['material-icons', style.md36].join(' ')}>hotel</span>

                <MenuItem iconName={'settings'} onClick={()=>alert('pizda')}>Настройки</MenuItem>
                <MenuItem iconName={'grid_on'}>Сетка</MenuItem>
                <MenuItem iconName={'format_list_bulleted'}>Отчеты</MenuItem>
            </div>

            <div className={style.rightSideMenu}>
                <MenuItem iconName={'account_box'}></MenuItem>
            </div>

        </header>
    )
}