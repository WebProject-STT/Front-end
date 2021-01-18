import React, { useEffect } from 'react';
import classNames from 'classnames';
import Post from './Post';
import { useVisibilityDispatch } from '../contexts/VisibilityContext';
import { useCategoryState } from '../contexts/CategoryContext';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import { postsData } from '../common/tempData';
import SearchIcon from '../common/icon/SearchIcon.png';
import '../styles/Post.scss';
import '../styles/Button.scss';

function PostList() {
	const { category } = useCategoryState();
	const visibilityDispatch = useVisibilityDispatch();
	const [form, onChange] = useInputs({ title: '' });
	const { title } = form;

	useEffect(() => {
		visibilityDispatch({ type: 'CATEGORY_VISIBLE' });
		return () => {
			visibilityDispatch({ type: 'CATEGORY_INVISIBLE' });
		};
	}, [visibilityDispatch]);

	return (
		<div className="post-list">
			<div className="list-header">
				<div className="search">
					<img className="search-icon" src={SearchIcon} alt="SearchIcon" />
					<input className="search-input" name="title" placeholder={Words.SEARCH} value={title} onChange={onChange} />
				</div>
				<div className={classNames('list-header', 'button-area')}>
					<button className={classNames('button', 'post-list', 'white')}>
						<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.ADD}</span>
					</button>
					<button className={classNames('button', 'post-list', 'blue')}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className="list-form">
				{category === '전체' ? postsData.map((post) => <Post post={post} key={post.id} />) : postsData.filter((post) => post.category === category).map((post) => <Post post={post} key={post.id} />)}
			</div>
		</div>
	);
}

export default PostList;
