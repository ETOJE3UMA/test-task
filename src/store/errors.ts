import { store } from '@/store/index.ts'
import BigNumber from 'bignumber.js'

export function checkProfitSum(): void {
	const profit = store.targets.reduce((acc, rec) => {
		return new BigNumber(acc).plus(rec.profit).toString()
	}, '0')

	if (new BigNumber(profit).gte(500)) {
		throw new Error('Maximum profit sum is 500%')
	}
}

export function checkProfitMin(): void {
	const isProfitMinimumError = store.targets.some((target) => new BigNumber(target.profit || 0).lt(0.01))

	if (isProfitMinimumError) {
		throw new Error('Minimum profit value is 0.01%')
	}
}

export function checkProfitPrevious(): void {
	const isCurrentMoreThenPrevious = store.targets.every((target, index, array) => {

		const nextIndex = index + 1
		return new BigNumber(nextIndex).lt(array.length) ? new BigNumber(target.profit || 0).lt(array[nextIndex].profit) : true
	})

	if (!isCurrentMoreThenPrevious) {
		throw new Error('Each target\'s profit should be greater than the previous one')
	}
}

export function checkPriceMoreThanNull(): void {
	const isPriceLessThanNull = store.targets.some((target) => new BigNumber(target.price || 0).lt(0))

	if (isPriceLessThanNull) {
		throw new Error('Price must be greater than 0')
	}
}

export function checkAmountSum(): void {
	const amountSum = store.targets.reduce((acc, rec) => {
		return new BigNumber(acc).plus(rec.amount || 0).toString()
	}, '0')

	if (new BigNumber(amountSum).gt(100)) {
		throw new Error(`${amountSum}% out of 100% selected. Please decrease by ${new BigNumber(amountSum).minus(100)}`)
	}

	if (new BigNumber(amountSum).lt(100)) {
		throw new Error(`${amountSum}% out of 100% selected. Please increase by ${new BigNumber(100).minus(amountSum)}`)
	}
}
