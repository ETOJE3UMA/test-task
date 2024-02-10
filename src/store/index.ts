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
		this.targets.map((target: IProfitRow) => {
			target.price = this.price * (1 + target.profit / 100)
			target.profit = (target.price / this.price - 1) * 100
		})
	},
	projectedProfit(): number {
		let totalProfit = 0
		this.targets.map((target: IProfitRow) => {
			totalProfit += target.amount * (target.price - this.price)
		})

		return Number(totalProfit.toFixed(2))
	},
	targets: [] as Array<IProfitRow>,
})
