import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useVisibilityDispatch } from '../contexts/VisibilityContext';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import SearchIcon from '../common/icon/SearchIcon.png';
import '../styles/Post.scss';
import '../styles/Button.scss';

function PostList() {
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
						<span className={classNames('text', 'blue', 'post', 'small')}>{Words.ADD}</span>
					</button>
					<button className={classNames('button', 'post-list', 'blue')}>
						<span className={classNames('text', 'white', 'post', 'small')}>{Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className="list-form"></div>
		</div>
	);
}

export default PostList;
