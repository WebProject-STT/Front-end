export function isEmpty(value) {
	return value.length === 0;
}

export function isCorrectLength(value, minSize = 0, maxSize = 1000000) {
	const length = ((s, b, i, c) => {
		for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
		return b;
	})(value);
	console.log(length);
	return length >= minSize && length <= maxSize;
}
