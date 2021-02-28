export function getPageArray(pageMaxIndex) {
	const pageArray = [];

	for (let i = 1; i <= pageMaxIndex; i++) {
		pageArray.push(i);
	}

	return pageArray;
}

export function getObjectTags(tags) {
	const noTags = tags.replaceAll('#', '');
	const objectTags = noTags.split(' ').map((tag) => {
		return { name: tag };
	});
	return objectTags;
}
