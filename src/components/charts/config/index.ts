import * as echarts from "echarts/core";
import {
    PieChart,
    // 系列类型的定义后缀都为 SeriesOption
    PieSeriesOption,
    //   LineChart,
    // LineSeriesOption,
    BarChart,
    BarSeriesOption,
} from "echarts/charts";
import {
    TitleComponent,
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption,
    GridComponent,
    GridComponentOption,
    // 数据集组件
    DatasetComponent,
    DatasetComponentOption,
    // 内置数据转换器组件 (filter, sort)
    TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import {
    // CanvasRenderer,
    SVGRenderer,
} from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | GridComponentOption
    | DatasetComponentOption>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    //   CanvasRenderer,
    SVGRenderer,
]);

export default echarts;
