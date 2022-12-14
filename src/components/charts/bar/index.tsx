import {
    useRef,
    useMemo,
    useEffect,
    useCallback
} from 'react';
import echarts, { ECOption } from '../config';
import styles from "./indx.module.scss"
import dayjs from "dayjs"

type BarData = {
    x: string | number
    y: number
}

interface IProps {
    data: BarData[];
    title?: string;
    subTitle?: string;
    onClickItem?: (date: string) => void;
}

export const Bar = (props: IProps) => {
    const { data, title, subTitle } = props;
    // 获取数据
    const chartRef = useRef<HTMLDivElement>(null);

    const colors = useCallback((value: number) => {
        if (value < 50) { return "#008000" }
        else if (value < 100) { return "#FFA500" }
        else { return "#8B0000" }
    }, [])

    const option: ECOption = useMemo(() => {
        return {
            title: {
                text: title ?? "",
                subtext: subTitle ?? "",
                left: 'center'
            },
            tooltip: {
                show: true,
                trigger: "item",
                triggerOn: "mousemove|click",
                axisPointer: {
                    type: "line"
                },
                showContent: true,
                alwaysShowContent: false,
                showDelay: 0,
                hideDelay: 100,
                textStyle: {
                    fontSize: 14
                },
                borderWidth: 0,
                padding: 5
            },
            xAxis: {
                type: 'category',
                data: data.map(item => {
                    return dayjs(item.x).format("MM-DD")
                }),
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    type: "bar",
                    label: {
                        show: true,
                        position: "top",
                        margin: 8
                    },
                    data: data.map(item => {
                        return {
                            value: item.y,
                            itemStyle: {
                                color: colors(item.y)
                            }
                        }
                    }),
                },
            ],
        };
    }, [data, title, subTitle])

    const bar = useMemo(() => {
        const chart = chartRef.current ? echarts.init(chartRef.current, undefined, { renderer: "svg" }) : null;
        chart?.on('click', (params) => {
            const date = dayjs(props.data[0].x).format("YYYY-") + params.name
            if (props.onClickItem) props.onClickItem(date)
        })
        return chart
    }, [chartRef.current])

    useEffect(() => {
        bar?.setOption(option)
    }, [bar, option])

    return <div ref={chartRef} className={styles.bar}></div>
}

export default Bar;
