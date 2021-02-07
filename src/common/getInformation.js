import { postsData } from './TempData';

export function getPostList(category) {
	const postList = category === '전체' ? postsData : postsData.filter((post) => post.category === category);
	return postList;
}
