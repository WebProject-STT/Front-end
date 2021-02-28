import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Words from '../common/Words';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';
import '../styles/Button.scss';

function ViewPostButton({ categoryId, userToken, postId, handleChangeFileModal, history }) {
	const callDeletePostApi = async () => {
		try {
			await axios
				.delete(`http://52.78.77.73:8080/contents/${postId}`, {
					headers: {
						memberId: userToken,
					},
				})
				.then((response) => {
					history.push(`/postList/${categoryId}`);
				});
		} catch (error) {
			alert(`${error}${Words.REPORT_ERROR}`);
		}
	};

	const deletePost = () => {
		const isConfirm = window.confirm(Words.ASK_DELETE_POST);
		if (isConfirm) {
			callDeletePostApi();
		}
	};

	return (
		<div className="view-header">
			<div className={classNames('view-header', 'button-area', 'big')}>
				<button className={classNames('button', 'view', 'white', 'detail')}>
					<span className={classNames('text', 'blue', 'post-list', 'small')} onClick={handleChangeFileModal}>
						{Words.CHANGE_FILE}
					</span>
				</button>
				<Link to={`/updatePost/${postId}`} className={classNames('button', 'view', 'white', 'detail')} id="update">
					<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.UPDATE}</span>
				</Link>
				<div className={classNames('button', 'view', 'blue', 'detail')} onClick={deletePost}>
					<span className={classNames('text', 'white', 'post-list', 'small')} id="delete">
						{Words.DELETE}
					</span>
				</div>
			</div>
		</div>
	);
}

export default ViewPostButton;
