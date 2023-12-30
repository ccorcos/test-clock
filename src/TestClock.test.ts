import { strict as assert } from "assert"
import { describe, it } from "mocha"
import { TestClock } from "./TestClock"

describe("TestClock", () => {
	it("log", async () => {
		const { sleep, run } = new TestClock()
		const log: number[] = []

		const promises = [
			(async () => {
				await sleep(1)
				log.push(1)
			})(),
			(async () => {
				log.push(0)
				await sleep(10)
				log.push(10)
			})(),
			(async () => {
				await sleep(4)
				log.push(4)
				await sleep(10)
				log.push(14)
				await sleep(10)
				log.push(24)
			})(),
			(async () => {
				await sleep(5)
				log.push(5)
				await sleep(10)
				log.push(15)
				await sleep(10)
				log.push(25)
			})(),
			(async () => {
				await sleep(5)
				log.push(6)
				await sleep(10)
				log.push(16)
				await sleep(10)
				log.push(26)
			})(),
		]

		run()
		await Promise.all(promises)

		assert.deepEqual(log, [0, 1, 4, 5, 6, 10, 14, 15, 16, 24, 25, 26])
	})

	it("subsequent sleeps", async () => {
		const { sleep, run } = new TestClock()
		const log: number[] = []

		const promises = [
			(async () => {
				await sleep(1)
				log.push(1)
				await sleep(1)
				log.push(2)
				await sleep(1)
				log.push(3)
				await sleep(1)
				log.push(4)
			})(),
			(async () => {
				await sleep(1.3)
				log.push(1.3)
				await sleep(1)
				log.push(2.3)
				await sleep(1)
				log.push(3.3)
				await sleep(1)
				log.push(4.3)
			})(),
			(async () => {
				await sleep(1.1)
				log.push(1.1)
				await sleep(1)
				log.push(2.1)
				await sleep(1)
				log.push(3.1)
				await sleep(1)
				log.push(4.1)
			})(),
			(async () => {
				await sleep(1.2)
				log.push(1.2)
				await sleep(1)
				log.push(2.2)
				await sleep(1)
				log.push(3.2)
				await sleep(1)
				log.push(4.2)
			})(),
		]

		run()
		await Promise.all(promises)

		assert.deepEqual(
			log,
			[1, 1.1, 1.2, 1.3, 2, 2.1, 2.2, 2.3, 3, 3.1, 3.2, 3.3, 4, 4.1, 4.2, 4.3]
		)
	})

	it("subsequent at the same time", async () => {
		const { sleep, run } = new TestClock()
		const log: number[] = []

		const promises = [
			(async () => {
				await sleep(1)
				log.push(1)
				await sleep(1)
				log.push(2)
				await sleep(1)
				log.push(3)
				await sleep(1)
				log.push(4)
			})(),
			(async () => {
				await sleep(1)
				log.push(1.3)
				await sleep(1.3)
				log.push(2.3)
				await sleep(1)
				log.push(3.3)
				await sleep(1)
				log.push(4.3)
			})(),
			(async () => {
				await sleep(1)
				log.push(1.1)
				await sleep(1.1)
				log.push(2.1)
				await sleep(1)
				log.push(3.1)
				await sleep(1)
				log.push(4.1)
			})(),
			(async () => {
				await sleep(1)
				log.push(1.2)
				await sleep(1.2)
				log.push(2.2)
				await sleep(1)
				log.push(3.2)
				await sleep(1)
				log.push(4.2)
			})(),
		]

		run()
		await Promise.all(promises)

		assert.deepEqual(
			log,
			[1, 1.1, 1.2, 1.3, 2, 2.1, 2.2, 2.3, 3, 3.1, 3.2, 3.3, 4, 4.1, 4.2, 4.3]
		)
	})
})
