import React from 'react';
import classNames from 'classnames';
import '../styles/Post.scss';
import '../styles/Text.scss';

function Post({ post }) {
	return (
		<div className="post">
			<div className="title-area">
				<span className={classNames('text', 'post', 'black', 'big')}>{post.title}</span>
			</div>
			<div className="date-area">
				<span className={classNames('text', 'post', 'gray', 'small')}>{post.date}</span>
			</div>
		</div>
	);
}

export default Post;
