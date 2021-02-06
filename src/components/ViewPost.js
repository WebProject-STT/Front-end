import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import Words from '../common/Words';
import ChangeFileModal from './ChangeFileModal';
import UpdatePost from './UpdatePost';
import '../styles/ViewPost.scss';
import Contents from './Contents';
import LeftArrow from '../common/icon/LeftArrow.png';
import RightArrow from '../common/icon/RightArrow.png';

function scrollToUp(event) {
	// 스크롤 위로 올라가지 않음, 고쳐야됨
	document.getElementById('root').scrollTo(0, 0);
}

function ViewPost({ match }) {
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const [isChangeFileModalOn, setIsChangeFileModalOn] = useState(false);

	useEffect(() => {
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		scrollToUp();
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

	const handleChangeFileModal = () => {
		setIsChangeFileModalOn(!isChangeFileModalOn);
	};

	return (
		<div className="view-area">
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
				<div className="footer">
					<img className="left-arrow" src={LeftArrow} alt="LeftArrow" />
					<img className="right-arrow" src={RightArrow} alt="RightArrow" />
				</div>
			</div>
			{isChangeFileModalOn && <ChangeFileModal handleChangeFileModal={handleChangeFileModal}></ChangeFileModal>}
		</div>
	);
}

export default ViewPost;
