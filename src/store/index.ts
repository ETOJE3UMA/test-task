import { reactive } from 'vue'
import { IProfitRow } from '@/types/profit.ts'
import BigNumber from 'bignumber.js'


export const store = reactive({
	activeOrderSide: 'buy',
	price: '2',
	amount: '0',
	total(): string {
		return new BigNumber(this.price).mul(this.amount).toString()
	},
	setTotal(total: string): void  {
		this.amount = new BigNumber(this.price).gt(0) ? new BigNumber(total).div(this.price).toString() : '0'
	},
	setPrice(): void {
		this.targets.forEach((target: IProfitRow) => {
			target.price = new BigNumber(this.price).gt(0) ? new BigNumber(this.price).mul((new BigNumber(target.profit).div(100).plus(1))).toString() : '0'

			if (new BigNumber(this.price).lte(0)) {
				target.profit = '0'
			}
		})
	},
	projectedProfit(): string {
		return this.targets.reduce((acc, rec) => {
			acc = new BigNumber(acc).plus(new BigNumber(rec.amount).mul((new BigNumber(rec.price).sub(this.price)))).toString()
			return acc
		}, '0')
	},
	targets: [] as Array<IProfitRow>,
	error: ''
})
