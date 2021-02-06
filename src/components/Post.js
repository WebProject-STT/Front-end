import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCheckedItemsDispatch, useCheckedItemsState } from '../contexts/CheckedItemContext';
import { useCheckStatusState } from '../contexts/CheckStatusContext';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';

function Post({ post }) {
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const { checkBoxVisibility } = useCheckStatusState();

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
			<Link to={`/viewPost/${post.id}`} className="post">
				{/* <div className="title-area"> */}
				<span className={classNames('text', 'bold', 'title')}>{post.title}</span>
				{/* </div> */}
				<div className="date-area">
					<span className={classNames('text', 'gray', 'date')}>{post.date}</span>
				</div>
			</Link>
		</div>
	);
}

export default Post;
