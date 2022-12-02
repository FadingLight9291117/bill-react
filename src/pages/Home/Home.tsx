import styles from "./Home.module.scss"
import * as R from 'ramda'
import { BillType, IBill } from "../../model"
import Bar from "../../components/charts/bar"
import { useContext, useEffect, useState } from "react";
import { BillContext } from "../../store";
import { observer } from "mobx-react-lite";
import Pie from "../../components/charts/pie";
import { Card, Modal, DatePicker, Radio, Space } from "antd";
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
        { label: '支出', value: BillType.CONSUME },
        { label: '收入', value: BillType.INCOME },
    ];
    const [billType, setBillType] = useState(BillType.CONSUME)

    // 点击bar弹出当天pie
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState<{
        x: string
        y: number
    }[]>([]);

    // 显示单个cls的饼状图，查看cls内部的label的消费情况，
    // 这里有一个cls列表
    const clsesForShow = ["餐饮", "恋爱"]

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
                <Bar
                    data={transformer(billStore.groupByDate(billType))}
                    onClickItem={date => {
                        setIsModalOpen(true)
                        setModalTitle(date)
                        setModalData(transformer(billStore.groupByClass(billType, date)))
                    }}
                />
            </div>
            <div className={styles.cards}>
                <Card >
                    <Pie
                        title="本月消费分类"
                        data={transformer(billStore.groupByClass(billType))}
                    />
                </Card>
                {
                    clsesForShow.map(cls => {
                        return (<Card key={cls.toString()}>
                            <Pie
                                title={cls}
                                data={transformer(billStore.groupByLabelOfClass(cls))}
                            />
                        </Card>)
                    })
                }
            </div>
            <Modal
                visible={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                title={modalTitle}
            >
                <Pie
                    data={modalData}
                />
            </Modal>
        </div>
    )
}

export default observer(Home)