export type BillLabel = {
    consume: Array<BillLabelOption>,
    income: Array<BillLabelOption>,
}

type BillLabelOption = {
    name: string,
    labels: Array<string>,
}
