import React from "react";
import style from './Main.module.css'
import {TableContainer} from "../Table/TableContainer";

export function Main(props) {

   return <main className={style.main}>Main<br/><TableContainer /></main>
}