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
		]

		await run()
		await Promise.all(promises)

		assert.deepEqual(log, [0, 1, 4, 5, 10, 14, 15, 24, 25])
	})
})
