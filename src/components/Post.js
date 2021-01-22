import React from 'react';
import classNames from 'classnames';
import { useCheckedItemsDispatch, useCheckedItemsState } from '../contexts/CheckedItemContext';
import { useCheckBoxVisibilityState } from '../contexts/CheckBoxVisibilityContext';
import '../styles/Post.scss';
import '../styles/Text.scss';

function Post({ post }) {
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const { checkBoxVisibility } = useCheckBoxVisibilityState();

	const checkHandler = ({ target }) => {
		if (target.checked) {
			checkedItemsDispatch({ type: 'ADD_ITEM', item: post.id });
		} else {
			checkedItemsDispatch({ type: 'DELETE_ITEM', item: post.id });
		}
	};

	return (
		<div className="post-area">
			{checkBoxVisibility && (
				<label className="check-label">
					<input
						className="check-input"
						type="checkbox"
						onChange={(e) => {
							checkHandler(e);
						}}
						checked={checkedItems.includes(post.id)}
					/>
					<span className="check-box"></span>
				</label>
			)}
			<div className="post">
				<div className="title-area">
					<span className={classNames('text', 'post', 'black', 'big')}>{post.title}</span>
				</div>
				<div className="date-area">
					<span className={classNames('text', 'post', 'gray', 'small')}>{post.date}</span>
				</div>
			</div>
		</div>
	);
}

export default Post;
