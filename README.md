# .

## MobX-react

> `yarn add mobx mobx-react-lite`

1. makeAutoObserver

```ts
export class Bill {
    bills: IBill[] = [];            // state

    constructor() {
        makeAutoObservable(this)    // makeAutoObservable
    }

    get list() {                    // 计算属性computed, 缓存结果
        return this.bills;
    }

    add(bill: IBill) {              // action修改状态
        this.bills.push(bill);
    }

    async fetch() {
        runInAction(() => {         // runInAction 异步修改状态
            this.bills.push({
                date: Date.now().toString(),
                money: 123,
                cls: "test",
                label: "test",
            })
        })
    }
}
```

2. observer

> observer 包裹函数式组件, 状态更新时自动刷新组件

```ts
const Home = observer(() => {...})

```

