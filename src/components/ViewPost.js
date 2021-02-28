import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { useUserState } from '../contexts/UserContext';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import usePagination from '../hooks/usePagination';
import useAsync from '../hooks/useAsync';
import { getContents, getContentsList } from '../api/ContentsAPI';
import { getPageArray } from '../common/getInformation';
import ChangeFileModal from './ChangeFileModal';
import ViewPostButton from './ViewPostButton';
import Contents from './Contents';
import Post from './Post';
import LeftArrow from '../icon/LeftArrow.png';
import RightArrow from '../icon/RightArrow.png';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/ViewPost.scss';
import '../styles/Text.scss';
import '../styles/Button.scss';

function ViewPost({ match, history }) {
	const { postId, categoryId } = match.params;
	const postIdNum = parseInt(postId);
	const categoryIdNum = parseInt(categoryId);
	const pageCount = 4;
	const { userToken } = useUserState();
	const { currentCategoryId } = useCategoryState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const categoryDispatch = useCategoryDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const [isChangeFileModalOn, setIsChangeFileModalOn] = useState(false);
	const [getContentsState, getContentsRefetch, getContentsChangeFetchEnd] = useAsync(() => getContents(postIdNum, userToken), postIdNum, false);
	const { loading: getContentsLoading, data: contents, fetchEnd: getContentsFetchEnd } = getContentsState;
	const [getContentsListState, getContentsListRefetch, getContentsListchangeFetchEnd] = useAsync(
		() => getContentsList(contents.category.id, userToken),
		contents.length !== 0 && contents.category.id,
		true
	);
	const { loading: getContentsListLoading, data: postList, fetchEnd: getContentsListFetchEnd } = getContentsListState;
	const initialPage = useMemo(() => Math.floor(postList.findIndex((post) => post.id === postIdNum) / pageCount) + 1, [postList, postIdNum, pageCount]);
	const [pagination, updateCurrentPage, updateStartEndPage] = usePagination(initialPage);
	const { currentPage, start, end } = pagination;
	const postCount = useMemo(() => postList.length, [postList]);
	const pageMaxIndex = useMemo(() => Math.ceil(postCount / pageCount), [postCount, pageCount]);
	const pageArray = useMemo(() => getPageArray(pageMaxIndex).slice(start, end), [pageMaxIndex, start, end]);
	const postIndexStart = useMemo(() => (currentPage - 1) * pageCount, [currentPage, pageCount]);
	const postIndexEnd = useMemo(() => currentPage * pageCount, [currentPage, pageCount]);
	const blue = '#1a3270';

	useEffect(() => {
		window.scroll({ top: 0 });
		checkStatusDispatch({ type: 'RESET' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		if (currentCategoryId !== 0) {
			categoryDispatch({ type: 'SET_CURRENT_CATEGORY', value: categoryIdNum });
		}
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch, categoryDispatch, checkStatusDispatch, checkedItemsDispatch, categoryIdNum, currentCategoryId]);

	if (getContentsFetchEnd) {
		getContentsChangeFetchEnd();
		getContentsListRefetch();
	}

	if (getContentsListFetchEnd) {
		updateCurrentPage(initialPage);
		getContentsListchangeFetchEnd();
	}

	const handleChangeFileModal = () => {
		setIsChangeFileModalOn(!isChangeFileModalOn);
	};

	return (
		<div className="view-area">
			<ViewPostButton userToken={userToken} postId={postIdNum} categoryId={currentCategoryId} handleChangeFileModal={handleChangeFileModal} history={history} />
			{getContentsLoading || getContentsListLoading ? (
				<div className="loading-div">
					<img src={LoadingImage} alt="LoadingImage" />
				</div>
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
									<Post post={post} isDetail={true} currentPostId={postIdNum} key={post.id} />
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
										key={page}
									>
										<span className={classNames('text', 'page-number')} style={{ color: currentPage === page ? blue : 'gray' }}>
											{page}
										</span>
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
