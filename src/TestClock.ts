import { search } from "@ccorcos/ordered-array"
import { resolver } from "@rocicorp/resolver"

export class TestClock {
	t = 0

	timeline: { promise: Promise<void>; resolve: () => void; t: number }[] = []

	sleep = (dt: number) => {
		const { promise, resolve } = resolver()

		const t = this.t + dt
		const result = search(this.timeline, t, (item) => item.t)
		const index = result.found !== undefined ? result.found + 1 : result.closest
		const item = { promise, resolve, t: this.t + dt }
		this.timeline.splice(index, 0, item)
		if (this.t === Infinity) setImmediate(this.run)
		return promise
	}

	run = async () => {
		return this.tick(Infinity)
	}

	async tick(t: number) {
		while (true) {
			const first = this.timeline[0]
			if (!first || first.t > t) break
			this.timeline.shift()
			this.t = first.t
			first.resolve()
			await first.promise
		}
		this.t = t
	}
}
