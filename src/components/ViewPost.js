import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import Words from '../common/Words';
import { postsData } from '../common/TempData';
import { getPostList } from '../common/getInformation';
import ChangeFileModal from './ChangeFileModal';
import Contents from './Contents';
import Post from './Post';
import LeftArrow from '../common/icon/LeftArrow.png';
import RightArrow from '../common/icon/RightArrow.png';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';

function scrollToUp(event) {
	// 스크롤 위로 올라가지 않음, 고쳐야됨
	document.getElementById('root').scrollTo(0, 0);
}

function ViewPost({ match }) {
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const [isChangeFileModalOn, setIsChangeFileModalOn] = useState(false);
	// 일단은 배열에서 find 찾지만 api적용하면 바로 데이터 하나만 받아올 수 있음
	const contents = postsData.find((post) => post.ct_id === postIdNum);
	const postList = getPostList(contents.ct_category);

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

	const deletePost = (e) => {
		const isConfirm = window.confirm(Words.ASK_DELETE_POST);
		if (isConfirm) {
			// api호출해서 해당 게시글 삭제
		} else {
			e.preventDefault();
		}
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
					<Link to="/postList" className={classNames('button', 'view', 'blue', 'detail')} onClick={deletePost}>
						<span className={classNames('text', 'white', 'post-list', 'small')} id="delete">
							{Words.DELETE}
						</span>
					</Link>
				</div>
			</div>
			<div className={classNames('post-view', 'detail')}>
				<div className={classNames('view-form', 'middle')}>
					<Contents contents={contents} />
				</div>
				<div className="detail-list ">
					<div className="detail-category">
						<span className={classNames('text', 'bold', 'post-detail', 'category-name')}>{contents.ct_category}</span>
					</div>
					<div className={classNames('view-form', 'small')}>
						{postList.map((post) => (
							<Post id={post.ct_id} title={post.ct_title} date={post.ct_date} isDetail={true} currentPostId={postIdNum} key={post.ct_id} />
						))}
					</div>
				</div>
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
