import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCheckedItemsDispatch, useCheckedItemsState } from '../contexts/CheckedItemContext';
import { useCheckStatusState } from '../contexts/CheckStatusContext';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';

function Post({ post, isDetail, currentPostId }) {
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const { checkBoxVisibility } = useCheckStatusState();
	const { id, title, date } = post;
	const blueGray = '#ededf2';
	console.log(isDetail);
	const checkHandler = ({ target }) => {
		if (target.checked) {
			checkedItemsDispatch({ type: 'ADD_ITEM', item: id });
		} else {
			checkedItemsDispatch({ type: 'DELETE_ITEM', item: id });
		}
	};

	return (
		<div className={isDetail ? classNames('post-area', 'detail') : 'post-area'}>
			{!isDetail && checkBoxVisibility && (
				<label className="check-label">
					<input
						className="check-input"
						type="checkbox"
						onChange={(e) => {
							checkHandler(e);
						}}
						checked={checkedItems.includes(id)}
					/>
					<span className="check-box"></span>
				</label>
			)}
			<Link to={`/viewPost/${id}`} className={isDetail ? 'post' : classNames('post', 'list')} style={{ backgroundColor: currentPostId === id && blueGray }}>
				{/* <div className="title-area"> */}
				<span className={isDetail ? classNames('text', 'title', 'detail') : classNames('text', 'bold', 'title')}>{title}</span>
				{/* </div> */}
				<div className="date-area">
					<span className={isDetail ? classNames('text', 'date', 'detail') : classNames('text', 'gray', 'date')}>{date}</span>
				</div>
			</Link>
		</div>
	);
}

export default Post;
