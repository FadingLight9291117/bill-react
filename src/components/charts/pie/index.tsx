import {
    useRef,
    useMemo,
    useEffect
} from "react"
import echarts, { ECOption } from '../config';
import styles from "./index.module.scss"

type PieData = {
    x: string
    y: number
}

interface IProps {
    data: PieData[]
    title?: string
    subTitle?: string
}


export default function Pie(props: IProps) {
    // 获取数据
    const { data, title, subTitle } = props

    const chartRef = useRef<HTMLDivElement>(null)
    // 设置图标配置
    const option: ECOption = useMemo(() => {
        return {
            title: {
                text: title ?? "",
                subtext: subTitle ?? "",
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            // },
            series: [
                {
                    name: "金额",
                    type: "pie",
                    radius: ['40%', '70%'],
                    // roseType: "radius",
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                        
                    },
                    label: {
                        show: true,
                        // position: "top",
                        margin: 8,
                        formatter: "{b}: {c}"
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: data.map(item => {
                        return {
                            name: item.x,
                            value: item.y
                        }
                    }),
                },
            ],
        }
    }, [data, title, subTitle])

    // 挂载echarts
    const pie = useMemo(() => {
        return chartRef.current ? echarts.init(chartRef.current, undefined, { renderer: "svg" }) : null
    }, [chartRef.current])
    // 设置pie选项
    useEffect(() => {
        pie?.setOption(option)
    }, [pie, option])

    return <div ref={chartRef} className={styles.pie}></div>;
}
