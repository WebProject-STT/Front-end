import Words from '../common/Words';

export function isEmpty(value) {
	return value.length === 0;
}

export function isCorrectLength(value, minSize = 0, maxSize = 1000000) {
	const length = value.length;
	return length >= minSize && length <= maxSize;
}

export function checkCorrectTags(tags) {
	const splitTags = tags.split(' ');
	const length = splitTags.length;
	let alertText = '';
	if (length > 30) {
		alertText = Words.LIMIT_TAGS_NUMBER;
	} else if (splitTags.indexOf(splitTags[length - 1]) !== length - 1) {
		alertText = `'${splitTags[length - 1]}' ${Words.DUPLICATE_TAGS}`;
	}
	alertText !== '' && alert(alertText);
	return alertText;
}
