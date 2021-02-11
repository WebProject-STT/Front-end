import { postsData } from './TempData';

export function getPostList(categoryId) {
	const postList = categoryId === 1 ? postsData : postsData.filter((post) => post.ct_category.cg_id === categoryId);
	return postList;
}
