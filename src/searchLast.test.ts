import { strict as assert } from "assert"
import { describe, it } from "mocha"
import { searchLast } from "./searchLast"

describe("searchLast", () => {
	it("inserts duplicated in order", () => {
		const log = [
			{ key: 1, value: 1 },
			{ key: 2, value: 1 },
			{ key: 3, value: 1 },
		]
		{
			const result = searchLast(log, 2, ({ key }) => key)
			log.splice(result.found! + 1, 0, { key: 2, value: 2 })
		}
		{
			const result = searchLast(log, 2, ({ key }) => key)
			log.splice(result.found! + 1, 0, { key: 2, value: 3 })
		}
		{
			const result = searchLast(log, 3, ({ key }) => key)
			log.splice(result.found! + 1, 0, { key: 3, value: 2 })
		}

		assert.deepEqual(log, [
			{ key: 1, value: 1 },
			{ key: 2, value: 1 },
			{ key: 2, value: 2 },
			{ key: 2, value: 3 },
			{ key: 3, value: 1 },
			{ key: 3, value: 2 },
		])
	})
})
