import { reactive } from 'vue'
import { IProfitRow } from '@/types/profit.ts'
import BigNumber from 'bignumber.js'


export const store = reactive({
	activeOrderSide: 'buy',
	price: '2',
	amount: '0',
	total(): string {
		return new BigNumber(this.price || 0).mul(this.amount || 0).toString()
	},
	setTotal(total: string): void  {
		this.amount =  new BigNumber(this.price || 0).gt(0) ? new BigNumber(total || 0).div(this.price).toString() : '0'
	},
	setPrice(): void {
		this.targets.forEach((target: IProfitRow) => {
			if (this.activeOrderSide === 'buy') {
				target.price = new BigNumber(this.price).gt(0) ? new BigNumber(this.price).mul((new BigNumber(target.profit || 0).div(100).plus(1))).toString() : '0'
			} else {
				target.price = new BigNumber(this.price).gt(0) ? new BigNumber(this.price).mul((new BigNumber(target.profit || 0).div(100).minus(1))).toString() : '0'
			}

			if (new BigNumber(this.price || 0).lte(0)) {
				target.profit = '0'
			}
		})
	},
	projectedProfit(): string {
		if (this.activeOrderSide === 'buy') {
			return this.targets.reduce((acc, rec) => {
				return new BigNumber(acc).plus(new BigNumber(rec.amount || 0).mul((new BigNumber(rec.price || 0).sub(this.price || 0)))).toString()
			}, '0')
		}

		return this.targets.reduce((acc, rec) => {
			return new BigNumber(acc).plus(new BigNumber(rec.amount || 0).mul((new BigNumber(this.price || 0).sub(rec.price || 0 )))).toString()
		}, '0')
	},
	targets: [] as Array<IProfitRow>,
	error: ''
})
