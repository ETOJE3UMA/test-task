import { reactive } from 'vue'


export const store = reactive({
	activeOrderSide: 'buy',
	price: 2,
	amount: 0,
	total(): number {
		return this.price * this.amount
	},
	setTotal(total: number): void  {
		this.amount = this.price > 0 ? total / this.price : 0
	}
})
