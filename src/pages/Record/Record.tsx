import {
    Button,
    DatePicker,
    Input,
    InputNumber,
    message,
    Radio,
    Select,
    Space
} from "antd";
import {useContext, useEffect, useRef, useState} from "react";
import {BillType, EmptyBill} from "../../model";
import moment from "moment/moment";
import {BillContext} from "../../store";
import {observer} from "mobx-react-lite";
import styles from "./Record.module.scss"
import {BaseSelectRef} from "rc-select/lib/BaseSelect";

function Record() {

    const billStore = useContext(BillContext)
    const cls2label = billStore.cls2label

    const emptyBill = EmptyBill()
    const [billType, setBillType] = useState(emptyBill.type)
    const [date, setDate] = useState(emptyBill.date)
    const [cls, setCls] = useState(emptyBill.cls)
    const [label, setLabel] = useState(emptyBill.label)
    const [money, setMoney] = useState("")
    const [options, setOptions] = useState(emptyBill.options)

    const clsRef = useRef<BaseSelectRef>(null)
    useEffect(() => {
        if (!!clsRef.current) clsRef.current.focus()
    }, [clsRef])


    const typeOpt = [
        {label: '支出', value: BillType.consume},
        {label: '收入', value: BillType.income},
    ];


    const submit = async () => {
        const bill = EmptyBill()
        bill.type = billType
        bill.date = date
        bill.cls = cls
        bill.label = label
        bill.money = Number(money)
        bill.options = options
        const checkBill = () => {
            return bill.cls !== '' && bill.label !== '' && bill.money !== 0
        }
        const reset = () => {
            setCls("")
            setLabel("")
            setMoney("")
            setOptions("")
            if (!!clsRef.current) {
                clsRef.current.focus()
            }
        }

        if (checkBill()) {
            await billStore.add(bill)
            reset()
        } else {
            message.error("请输入完整")
        }
    }
    return (
        <div className={styles.record}>
            <div className={styles.new}>
                <Space align="start">
                    <Radio.Group
                        options={typeOpt}
                        optionType="button"
                        buttonStyle="solid"
                        value={billType}
                        onChange={e => setBillType(e.target.value)}
                    />
                    <DatePicker
                        value={moment(date, 'YYYY-MM-DD')}
                        onChange={(_, dateStr) => setDate(dateStr)}
                    />
                    <Select
                        ref={clsRef}
                        style={{width: 120}}
                        showSearch
                        placeholder="类别"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                        value={cls === "" ? null : cls}
                        onChange={c => {
                            setCls(c)
                            setLabel(cls2label.consume[c][0])
                        }}
                    >
                        {Object.keys(cls2label.consume)
                            .map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)
                        }
                    </Select>
                    <Select
                        style={{width: 120}}
                        showSearch
                        placeholder="标签"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                        value={label === "" ? null : label}
                        onChange={setLabel}>
                        {cls !== "" &&
                            cls2label.consume[cls]
                                .map(la => <Select.Option key={la} value={la}>{la}</Select.Option>)
                        }
                    </Select>
                    <InputNumber
                        style={{width: 120}}
                        placeholder="money"
                        prefix="￥"
                        value={money}
                        onChange={setMoney}
                        onKeyDown={e => e.key === "Enter" && submit()}
                    />
                    <Input.TextArea
                        value={options}
                        onChange={value => setOptions(value.target.value)}
                        rows={1}
                        placeholder="备注"
                        onKeyDown={e => e.key === "Enter" && submit()}
                    />
                    <Button
                        type="primary"
                        onKeyUp={e => e.key === "Tab"
                            && clsRef.current!.focus()
                    }
                        onClick={submit}
                    >提交</Button>
                </Space>
            </div>
            <div className={styles.table}></div>
        </div>
    )
}

export default observer(Record)