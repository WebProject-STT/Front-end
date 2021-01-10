export function isEmpty(value) {
	return value.length === 0;
}

export function isCorrectLength(value, minSize, maxSize = 1000000) {
	const length = value.length;
	return length >= minSize && length <= maxSize;
}
