import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { useUserState } from '../contexts/UserContext';
import Words from '../common/Words';
import usePagination from '../hooks/usePagination';
import useAsync from '../hooks/useAsync';
import { getContents, getContentsList, deleteContents } from '../api/ContentsAPI';
import { getPageArray } from '../common/getInformation';
import ChangeFileModal from './ChangeFileModal';
import Contents from './Contents';
import Post from './Post';
import LeftArrow from '../icon/LeftArrow.png';
import RightArrow from '../icon/RightArrow.png';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';

function scrollToUp(event) {
	// 수정 스크롤 위로 올라가지 않음, 고쳐야됨
	document.getElementById('root').scrollTo(0, 0);
}

function ViewPost({ match }) {
	const { userToken } = useUserState();
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const pageCount = 4;
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const checkStatusDispatch = useCheckStatusDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const [isChangeFileModalOn, setIsChangeFileModalOn] = useState(false);
	const [getContentsState, getContentsRefetch] = useAsync(() => getContents(postIdNum, userToken), [postIdNum], false);
	const { loading: getContentsLoading, data: contents, error: getContentsError } = getContentsState;
	const [getContentsListState, getContentsListRefetch] = useAsync(() => getContentsList(contents.category.id, userToken, [contents.category.id], true));
	const { loading: getContentsListLoading, data: postList, error: getContentsListError } = getContentsListState;
	const [deleteContentsState, deleteContentsRefetch] = useAsync(
		() => {
			deleteContents([postIdNum], userToken);
		},
		[],
		true
	);
	const initialPage = Math.floor(postList.findIndex((post) => post.ct_id === postIdNum) / pageCount) + 1;
	const [pagination, updateCurrentPage, updateStartEndPage] = usePagination(initialPage);
	const { currentPage, start, end } = pagination;
	const postCount = useMemo(() => postList.length, [postList]);
	const pageMaxIndex = Math.ceil(postCount / pageCount);
	const pageArray = getPageArray(pageMaxIndex).slice(start, end);
	const postIndexStart = (currentPage - 1) * pageCount;
	const postIndexEnd = currentPage * pageCount;

	if (contents.length !== 0) {
		// getContentsListRefetch();
	}

	useEffect(() => {
		checkStatusDispatch({ type: 'RESET' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
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
			deleteContentsRefetch();
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
					<Link to={contents.length !== 0 ? `/postList/${contents.category.id}` : '/postList/0'} className={classNames('button', 'view', 'blue', 'detail')} onClick={deletePost}>
						<span className={classNames('text', 'white', 'post-list', 'small')} id="delete">
							{Words.DELETE}
						</span>
					</Link>
				</div>
			</div>
			<div className={classNames('post-view', 'detail')}>
				<div className={classNames('view-form', 'middle')}>
					{contents.length === 0 ? <img className="loading-image" src={LoadingImage} alt="LoadingImage" /> : <Contents contentsId={postIdNum} contents={contents} />}
				</div>
				<div className="detail-list ">
					<div className="detail-category">
						<span className={classNames('text', 'bold', 'post-detail', 'category-name')}>{postList}</span>
					</div>
					<div className={classNames('view-form', 'small')}>
						{postList.slice(postIndexStart, postIndexEnd).map((post) => (
							<Post id={post.id} title={post.title} date={post.date} isDetail={true} currentPostId={postIdNum} key={post.ct_id} />
						))}
					</div>
				</div>
			</div>
			<div className="footer">
				<div className="page-number">
					<img
						className="left-arrow"
						src={LeftArrow}
						alt="LeftArrow"
						onClick={() => {
							if (currentPage !== 1) {
								updateCurrentPage(currentPage - 1);
								// pageCount 변수명 변경, 한페이지에 놓은 post수 / 페이지 갯수 변수 두개 설정
								if (currentPage % 10 === 1) {
									updateStartEndPage(false);
								}
							}
						}}
					/>
					{pageArray.map((page) => {
						return (
							<button
								className={classNames('button', 'view', 'white', 'page-link')}
								onClick={() => {
									updateCurrentPage(page);
								}}
								style={{ color: currentPage === page && 'pink' }}
							>
								{page}
							</button>
						);
					})}
					<img
						className="right-arrow"
						src={RightArrow}
						alt="RightArrow"
						onClick={() => {
							if (currentPage !== pageMaxIndex) {
								updateCurrentPage(currentPage + 1);
								// pageCount 변수명 변경, 한페이지에 놓은 post수 / 페이지 갯수 변수 두개 설정
								if (currentPage % 10 === 0) {
									updateStartEndPage(true);
								}
							}
						}}
					/>
				</div>
			</div>
			{isChangeFileModalOn && <ChangeFileModal contentsId={postIdNum} getContentsRefetch={getContentsRefetch} handleChangeFileModal={handleChangeFileModal}></ChangeFileModal>}
		</div>
	);
}

export default ViewPost;
