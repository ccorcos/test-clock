import { search } from "@ccorcos/ordered-array"

// Searched for the last item equal to the key in an ordered array, assuming a duplicate keys.
export function searchLast<T, K = T>(
	list: Array<T>,
	key: K,
	getKey: (item: T) => K
) {
	const result = search(list, key, getKey)
	if (result.found === undefined) return result

	let found = result.found
	while (true) {
		const next = found + 1
		if (next >= list.length) break
		if (getKey(list[next]) !== key) break
		found = next
	}

	return { found }
}
