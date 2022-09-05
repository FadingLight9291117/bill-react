import styles from "./Home.module.scss"
import * as R from 'ramda'
import {IBill} from "../../model"
import Bar from "../../components/charts/bar"
import {useContext, useEffect, useState} from "react";
import {BillContext} from "../../store";
import {observer} from "mobx-react-lite";
import Pie from "../../components/charts/pie";
import {Card, DatePicker} from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';

const Home = () => {
    const billStore = useContext(BillContext)

    const transformer = (record: Record<string, IBill[]>) => {
        return R.map((key: string) => {
            const moneys = record[key].map(bill => bill.money)
            return {
                x: key,
                y: Number(R.sum(moneys).toFixed(2)),
            }
        })(R.keys(record))
    }

    const now = new Date();
    const [year, setYear] = useState(now.getFullYear())
    const [month, setMonth] = useState(now.getMonth() + 1)

    useEffect(() => {
        billStore.fetch(year, month).then()
    }, [year, month])

    const changeDate = (date: moment.Moment | null, datestring: string) => {
        const d = date?.toDate() ?? new Date()
        setYear(d.getFullYear())
        setMonth(d.getMonth() + 1)
    }

    const TotalMoney = () => <Card>
        {"总金额"}
        ￥{billStore.totalMoney}
    </Card>

    return (
        <div className={styles.home}>
            <div className={styles.total}>
                <DatePicker
                    picker="month"
                    value={moment(`${year}-${month}`, 'YYYY-MM')}
                    onChange={changeDate}
                />
                <TotalMoney/>
            </div>
            <Bar data={transformer(billStore.listAllByDate)}/>
            <Pie data={transformer(billStore.listAllByClass)}/>
        </div>
    )
}


export default observer(Home)