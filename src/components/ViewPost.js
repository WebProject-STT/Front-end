import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import Words from '../common/Words';
import '../styles/ViewPost.scss';

function ViewPost({ match }) {
	const { postId } = match.params;
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
					<button className={classNames('button', 'post-list', 'white', 'big')}>
						<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.CHANGE_FILE}</span>
					</button>
					<button className={classNames('button', 'post-list', 'white', 'big')}>
						<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.UPDATE}</span>
					</button>
					<button className={classNames('button', 'post-list', 'blue', 'big')}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className="post-view">
				<div className={classNames('view-form', 'small')}>
					{/* <p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p>
				<p>야</p> */}
				</div>
			</div>
		</div>
	);
}

export default ViewPost;
