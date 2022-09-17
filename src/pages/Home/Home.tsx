import styles from "./Home.module.scss"
import * as R from 'ramda'
import { BillType, IBill } from "../../model"
import Bar from "../../components/charts/bar"
import { useContext, useEffect, useState } from "react";
import { BillContext } from "../../store";
import { observer } from "mobx-react-lite";
import Pie from "../../components/charts/pie";
import { Card, DatePicker, Radio, Space } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import dayjs from 'dayjs'

const Home = () => {
    const billStore = useContext(BillContext)

    const transformer = (record: Record<string, IBill[]>) => {
        const funcs = R.compose(
            R.sort((a: { x: string, y: number }, b) => {
                const date1 = dayjs(a.x).toDate().getTime()
                const date2 = dayjs(b.x).toDate().getTime()

                return date1 - date2
            }),
            R.map((key: string) => {
                const moneys = record[key].map(bill => bill.money)
                return {
                    x: key,
                    y: Number(R.sum(moneys).toFixed(2)),
                }
            }))
        return funcs(R.keys(record))
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

    const typeOpt = [
        { label: '支出', value: BillType.consume },
        { label: '收入', value: BillType.income },
    ];
    const [billType, setBillType] = useState(BillType.consume)

    return (
        <div className={styles.home}>
            <div className={styles.total}>
                <Space align="start">
                    <DatePicker
                        picker="month"
                        value={moment(`${year}-${month}`, 'YYYY-MM')}
                        onChange={changeDate}
                    />
                    <Radio.Group
                        options={typeOpt}
                        optionType="button"
                        buttonStyle="solid"
                        value={billType}
                        onChange={e => setBillType(e.target.value)}
                    />
                    <Card>
                        {"总金额"}
                        ￥{billStore.getTotalMoney(billType)}
                    </Card>
                </Space>
            </div>
            <div className={styles.monthBar}>
                <Bar data={transformer(billStore.groupByDate(billType))} />
            </div>
            <div className={styles.cards}>
                <Card bodyStyle={{ height: 400, width: 400 }}>
                    <Pie
                        title="本月消费分类"
                        data={transformer(billStore.groupByClass(billType))}
                    />
                </Card>
            </div>
        </div>
    )
}

export default observer(Home)