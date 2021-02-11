import { postsData } from './TempData';

export function getPostList(category) {
	const postList = category === '전체' ? postsData : postsData.filter((post) => post.ct_category === category);
	return postList;
}
