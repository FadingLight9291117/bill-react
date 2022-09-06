import {makeAutoObservable, runInAction} from "mobx";
import {createContext} from "react";
import {createBill, getBills, getClass} from "../api/bills";
import {BillType, IBill} from "../model";
import * as R from "ramda"

/**
 * 仅存储一个月的数据
 */
export class Bill {
    private _bills: IBill[] = [];
    // _cls2label: IClass = {consume: new Map<string, string[]>(), income: []}
    private _cls2label: { consume: Record<string, string[]>, income: [] } = {consume: {}, income: []}

    constructor() {
        makeAutoObservable(this)
        this.fetchClass().then()
    }

    get bills() {
        return this._bills
    }

    get cls2label() {
        return this._cls2label
    }

    groupByDate(type?: BillType) {
        const classFun = R.filter((bill: IBill) => R.of(bill.type).length === 0 || bill.type === type)
        const functions = R.compose(
            R.groupBy((bill: IBill) => bill.date),
            classFun,
        )
        return functions(this._bills)
    }

    groupByClass(type?: BillType) {
        const classFun = R.filter((bill: IBill) => R.of(bill.type).length === 0 || bill.type === type)
        const functions = R.compose(
            R.groupBy((bill: IBill) => bill.cls),
            classFun,
        )
        return functions(this._bills)
    }

    get listDailyMoney() {
        return this.groupByDate
    }

    get totalMoney() {
        const functions = R.compose(
            Number,
            (s: number) => s.toFixed(2),
            R.sum,
            R.map((bill: IBill) => bill.money)
        )
        return functions(this._bills)
    }

    get meanMoneyByDate() {
        const days = Reflect.ownKeys(this.groupByDate).length
        if (days === 0) return 0
        return this.totalMoney / days
    }


    async add(bill: IBill) {
        const {id} = await createBill(bill)
        bill.id = id
        runInAction(() => {
            this._bills.push(bill);
        })
    }

    async fetch(year: number, month: number) {
        const data = await getBills(year, month)
        runInAction(() => {
            this._bills = data
        })
    }

    async fetchClass() {
        const cls2label = await getClass()
        runInAction(() => {
            this._cls2label = cls2label
        })
    }
}

export const BillContext = createContext<Bill>(new Bill());
