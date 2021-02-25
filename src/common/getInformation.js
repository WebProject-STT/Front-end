export function getPageArray(pageMaxIndex) {
	const pageArray = [];

	for (let i = 1; i <= pageMaxIndex; i++) {
		pageArray.push(i);
	}

	return pageArray;
}
