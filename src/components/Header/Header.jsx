import React from 'react'
import style from './Header.module.css'
import {MenuItem} from './MenuItem'
import {TableSettingsForm} from '../Forms/TableSettingsForm'
import {withModal} from '../Modal/withModal'

const TableSettingsMenuItem = withModal(MenuItem)

export function Header(props) {
    return (
        <header className={style.header}>

            <div className={style.leftSideMenu}>
                <span className={['material-icons', style.md36].join(' ')}>hotel</span>

                <TableSettingsMenuItem iconName={'grid_on'} menuItemTitle={'Сетка'}>
                    <TableSettingsForm daysInTable={props.daysInTable} changeDaysInTable={props.changeDaysInTable}/>
                </TableSettingsMenuItem>

                <MenuItem iconName={'settings'} menuItemTitle={'Настройки'} />
                <MenuItem iconName={'format_list_bulleted'}>Отчеты</MenuItem>
            </div>

            <div className={style.rightSideMenu}>
                <MenuItem iconName={'account_box'} />
            </div>

        </header>
    )
}