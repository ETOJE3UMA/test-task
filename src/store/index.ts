import { reactive } from 'vue'
import { IProfitRow } from '@/types/profit.ts'


export const store = reactive({
	activeOrderSide: 'buy',
	price: 2,
	amount: 0,
	total(): number {
		return this.price * this.amount
	},
	setTotal(total: number): void  {
		this.amount = this.price > 0 ? total / this.price : 0
	},
	setPrice(): void {
		this.targets.forEach((target: IProfitRow) => {
			target.price = this.price > 0 ? this.price * (1 + target.profit / 100) : 0
			target.profit = this.price > 0 ? (target.price / this.price - 1) * 100 : 0
		})
	},
	projectedProfit(): number {
		const totalProfit = this.targets.reduce((acc, rec) => {
			acc += rec.amount * (rec.price - this.price)
			return acc
		}, 0)

		return Number(totalProfit.toFixed(2))
	},
	targets: [] as Array<IProfitRow>,
	error: ''
})
