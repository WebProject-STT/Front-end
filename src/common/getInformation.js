export function getPageArray(pageMaxIndex) {
	const pageArray = [];

	for (let i = 1; i <= pageMaxIndex; i++) {
		pageArray.push(i);
	}

	return pageArray;
}

export function getObjectTags(tags) {
	let objectTags = [];
	const noTags = tags.replaceAll('#', '');
	noTags.split(' ').map((tag) => {
		objectTags.push({ name: tag });
	});
	return objectTags;
}
