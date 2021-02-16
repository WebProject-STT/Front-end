import { postsData } from './TempData';

export function getPostList(categoryId) {
	const postList = categoryId === 1 ? postsData : postsData.filter((post) => post.ct_category.cg_id === categoryId);
	return postList;
}

export function getPageArray(pageMaxIndex) {
	const pageArray = [];

	for (let i = 1; i <= pageMaxIndex; i++) {
		pageArray.push(i);
	}

	return pageArray;
}
