import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import Words from '../common/Words';
import '../styles/ViewPost.scss';
import Contents from './Contents';

function ViewPost({ match }) {
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const componentVisibilityDispatch = useComponentVisibilityDispatch();

	useEffect(() => {
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

	return (
		<div className="view-area">
			<div className="view-header">
				<div className={classNames('view-header', 'button-area', 'big')}>
					<button className={classNames('button', 'view', 'white', 'detail')}>
						<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.CHANGE_FILE}</span>
					</button>
					<button className={classNames('button', 'view', 'white', 'detail')}>
						<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.UPDATE}</span>
					</button>
					<button className={classNames('button', 'view', 'blue', 'detail')}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className="post-view">
				<div className={classNames('view-form', 'middle')}>
					<Contents postId={postIdNum} />
				</div>
				<div className={classNames('view-form', 'small')}></div>
			</div>
		</div>
	);
}

export default ViewPost;
