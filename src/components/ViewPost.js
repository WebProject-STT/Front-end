import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { useUserState } from '../contexts/UserContext';
import { useCategoryState } from '../contexts/CategoryContext';
import { useContentsListState } from '../contexts/ContentsListContext';
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
	const { postId, categoryId } = match.params;
	const postIdNum = parseInt(postId);
	const categoryIdNum = parseInt(categoryId);
	const { currentCategoryId } = useCategoryState();
	const isAllCategory = currentCategoryId === 0;
	const pageCount = 4;
	const { contentsList } = useContentsListState();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const checkStatusDispatch = useCheckStatusDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const [isChangeFileModalOn, setIsChangeFileModalOn] = useState(false);
	const [getContentsState, getContentsRefetch, getContentsChangeFetchEnd] = useAsync(() => getContents(postIdNum, userToken), [postIdNum], false);
	const { loading: getContentsLoading, data: contents, error: getContentsError, fetchEnd: getContentsFetchEnd } = getContentsState;
	const [getContentsListState, getContentsListRefetch, getContentsListchangeFetchEnd] = useAsync(() => getContentsList(categoryIdNum, userToken), [], isAllCategory ? false : true);
	const { loading: getContentsListLoading, data, error: getContentsListError, fetchEnd: getContentsListFetchEnd } = getContentsListState;
	const postList = isAllCategory ? data : contentsList;
	const [deleteContentsState, deleteContentsRefetch] = useAsync(
		() => {
			deleteContents([postIdNum], userToken);
		},
		[],
		true
	);
	const initialPage = useMemo(() => Math.floor(postList.findIndex((post) => post.id === postIdNum) / pageCount) + 1, [postList, postIdNum, pageCount]);
	const [pagination, updateCurrentPage, updateStartEndPage] = usePagination(initialPage);
	const { currentPage, start, end } = pagination;
	const postCount = useMemo(() => postList.length, [postList]);
	const pageMaxIndex = useMemo(() => Math.ceil(postCount / pageCount), [postCount, pageCount]);
	const pageArray = useMemo(() => getPageArray(pageMaxIndex).slice(start, end), [pageMaxIndex, start, end]);
	const postIndexStart = useMemo(() => (currentPage - 1) * pageCount, [currentPage, pageCount]);
	const postIndexEnd = useMemo(() => currentPage * pageCount, [currentPage, pageCount]);

	useEffect(() => {
		checkStatusDispatch({ type: 'RESET' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

	if (getContentsListFetchEnd) {
		updateCurrentPage(initialPage);
		getContentsListchangeFetchEnd();
	}

	const handleChangeFileModal = () => {
		setIsChangeFileModalOn(!isChangeFileModalOn);
	};

	const deletePost = (e) => {
		const isConfirm = window.confirm(Words.ASK_DELETE_POST);
		if (isConfirm) {
			console.log('삭제');
			// deleteContentsRefetch();
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
					<Link to={`/postList/${currentCategoryId}`} className={classNames('button', 'view', 'blue', 'detail')} onClick={deletePost}>
						<span className={classNames('text', 'white', 'post-list', 'small')} id="delete">
							{Words.DELETE}
						</span>
					</Link>
				</div>
			</div>
			{getContentsLoading || getContentsListLoading ? (
				<img className="loading-image" src={LoadingImage} alt="LoadingImage" />
			) : (
				<>
					<div className={classNames('post-view', 'detail')}>
						<div className={classNames('view-form', 'middle')}>{contents.length !== 0 && <Contents contents={contents} />}</div>
						<div className="detail-list ">
							<div className="detail-category">
								<span className={classNames('text', 'bold', 'post-detail', 'category-name')}>{contents.length !== 0 && contents.category.title}</span>
							</div>
							<div className={classNames('view-form', 'small')}>
								{postList.slice(postIndexStart, postIndexEnd).map((post) => (
									<Post post={post} isDetail={true} currentPostId={postIdNum} key={post.ct_id} />
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
				</>
			)}
			{isChangeFileModalOn && <ChangeFileModal contentsId={postIdNum} getContentsRefetch={getContentsRefetch} handleChangeFileModal={handleChangeFileModal}></ChangeFileModal>}
		</div>
	);
}

export default ViewPost;
