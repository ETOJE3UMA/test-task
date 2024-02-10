import { store } from '@/store/index.ts'

export function checkProfitSum(): void {
	const profit = store.targets.reduce((acc, rec) => {
		return acc + rec.profit
	}, 0)

	if (profit >= 500) {
		throw new Error('Maximum profit sum is 500%')
	}
}

export function checkProfitMin(): void {
	const isProfitMinimumError = store.targets.some((target) => target.profit < 0.01)

	if (isProfitMinimumError) {
		throw new Error('Minimum profit value is 0.01%')
	}
}

export function checkProfitPrevious(): void {
	const isCurrentMoreThenPrevious = store.targets.every((target, index, array) => {

		const nextIndex = index + 1
		return nextIndex < array.length ? target.profit <= array[nextIndex].profit : true
	})

	if (!isCurrentMoreThenPrevious) {
		throw new Error('Each target\'s profit should be greater than the previous one')
	}
}

export function checkPriceMoreThanNull(): void {
	const isPriceLessThanNull = store.targets.some((target) => target.price < 0)

	if (isPriceLessThanNull) {
		throw new Error('Price must be greater than 0')
	}
}

export function checkAmountSum(): void {
	const amountSum = store.targets.reduce((acc, rec) => {
		return acc + rec.amount
	}, 0)

	if (amountSum > 100) {
		throw new Error(`${amountSum}% out of 100% selected. Please decrease by ${amountSum - 100}`)
	}

	if (amountSum < 100) {
		throw new Error(`${amountSum}% out of 100% selected. Please increase by ${100 - amountSum}`)
	}
}
