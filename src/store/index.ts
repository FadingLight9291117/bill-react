import {makeAutoObservable, runInAction} from "mobx";
import {createContext} from "react";
import {createBill, getBills, getClass} from "../api/bills";
import {IBill} from "../model";
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

    get listAllByDate() {
        return R.groupBy((bill: IBill) => bill.date)(this._bills)
    }

    get listAllByClass() {
        return R.groupBy((bill: IBill) => bill.cls)(this._bills)
    }

    get listDailyMoney() {
        return this.listAllByDate
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
        const days = Reflect.ownKeys(this.listAllByDate).length
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
