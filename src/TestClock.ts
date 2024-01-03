import { insertAfter } from "@ccorcos/ordered-array"
import { resolver } from "@rocicorp/resolver"

export class TestClock {
	t = 0

	timeline: { promise: Promise<void>; resolve: () => void; t: number }[] = []

	sleep = (dt: number) => {
		const { promise, resolve } = resolver()

		const item = { promise, resolve, t: this.t + dt }
		insertAfter(this.timeline, item, (item) => item.t)
		if (this.t === Infinity) this.run() // This should never happen actually.
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
