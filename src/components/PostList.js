import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Post from './Post';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusState, useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsState, useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { useCategoryState } from '../contexts/CategoryContext';
import { useUserState } from '../contexts/UserContext';
import useInputs from '../hooks/useInputs';
import usePagination from '../hooks/usePagination';
import useAsync from '../hooks/useAsync';
import { getContentsList, deleteContents } from '../api/ContentsAPI';
import Words from '../common/Words';
import { getPageArray } from '../common/getInformation';
import SearchIcon from '../icon/SearchIcon.png';
import LeftArrow from '../icon/LeftArrow.png';
import RightArrow from '../icon/RightArrow.png';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/ViewPost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function PostList() {
	const pageCount = 10;
	const { currentCategoryId } = useCategoryState();
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const { checkBoxVisibility, isAllChecked } = useCheckStatusState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const { userToken } = useUserState();
	const [form, onChange] = useInputs({ search: '' });
	const { search } = form;
	const [callGetPostList, setCallGetPostList] = useState(true);
	const [pagination, updateCurrentPage, updateStartEndPage] = usePagination();
	const { currentPage, start, end } = pagination;
	const [getPostState, getPostRefetch, getPostChangeFetchEnd] = useAsync(() => getContentsList(currentCategoryId, userToken), [currentCategoryId], userToken ? false : true, true);
	const { loading: getPostLoading, data: postList, error: getPostError, fetchEnd: getPostFetchEnd } = getPostState;
	const [deletePostState, deleteRefetch, deletePostChangeFetchEnd] = useAsync(() => deleteContents(checkedItems, userToken), [], true);
	const { loading: deletePostLoading, data: isDeletePost, error: deletePostError, fetchEnd: deletePostFetchEnd } = deletePostState;
	const postCount = useMemo(() => (!postList ? 0 : postList.length), [postList]);
	const pageMaxIndex = useMemo(() => Math.ceil(postCount / pageCount), [postCount, pageCount]);
	const pageArray = useMemo(() => getPageArray(pageMaxIndex).slice(start, end), [pageMaxIndex, start, end]);
	const postStartIndex = useMemo(() => (currentPage - 1) * pageCount, [currentPage, pageCount]);
	const postEndIndex = useMemo(() => currentPage * pageCount, [currentPage, pageCount]);
	const blue = '#1a3270';

	useEffect(() => {
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

	if (userToken && callGetPostList) {
		getPostRefetch();
		setCallGetPostList(false);
	}

	if (deletePostFetchEnd) {
		getPostRefetch();
		deletePostChangeFetchEnd();
	}

	const resetCheckedItems = () => {
		checkStatusDispatch({ type: 'SET_FALSE', name: 'isAllChecked' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
	};

	const checkBoxHandler = () => {
		if (checkBoxVisibility) {
			checkStatusDispatch({ type: 'SET_FALSE', name: 'checkBoxVisibility' });
			resetCheckedItems();
		} else {
			checkStatusDispatch({ type: 'SET_TRUE', name: 'checkBoxVisibility' });
		}
	};

	const allCheckedHandler = ({ target }) => {
		if (target.checked) {
			checkStatusDispatch({ type: 'SET_TRUE', name: 'isAllChecked' });
			postList.map((post) => {
				if (!checkedItems.includes(post.id)) {
					checkedItemsDispatch({ type: 'ADD_ITEM', item: post.id });
				}
			});
		} else {
			resetCheckedItems();
		}
	};

	const confirmDelete = () => {
		const isConfirm = window.confirm(Words.ASK_DELETE_POSTS);
		if (isConfirm) {
			deleteRefetch();
			resetCheckedItems();
		}
	};

	const confirmItemsNull = () => {
		const itemLength = checkedItems.length;
		if (itemLength === 0) {
			alert(Words.SELECT_POST);
		} else {
			confirmDelete();
		}
	};

	return (
		<div className="view-area">
			<div className="view-header">
				<div className={classNames('view-header', 'search-area')}>
					<div className="search-form">
						<img className="search-icon" src={SearchIcon} alt="SearchIcon" />
						<input className="search-input" name="search" placeholder={Words.SEARCH} value={search} onChange={onChange} />
					</div>
					{/* <button className={classNames('button', 'view', 'blue', 'small')}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{Words.SEARCH}</span>
					</button> */}
				</div>
				<div className={classNames('view-header', 'button-area', 'small')}>
					{checkBoxVisibility ? (
						<button className={classNames('button', 'view', 'white', 'list')} onClick={confirmItemsNull}>
							<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.DELETE}</span>
						</button>
					) : (
						<Link to="/AddPost" className={classNames('button', 'view', 'white', 'list')} id="add">
							<span className={classNames('text', 'blue', 'post-list', 'small')} id="add">
								{Words.ADD}
							</span>
						</Link>
					)}
					<button className={classNames('button', 'view', 'blue', 'list')} onClick={checkBoxHandler} id={!checkBoxVisibility ? 'delete' : ''}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{checkBoxVisibility ? Words.CANCEL : Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className={classNames('post-view', 'list')}>
				<div className="all-check">
					{getPostFetchEnd && postList.length !== 0 && checkBoxVisibility && (
						<>
							<label className="check-label">
								<input
									className="check-input"
									type="checkbox"
									checked={isAllChecked}
									onChange={(e) => {
										allCheckedHandler(e);
									}}
								/>
								<span className="check-box"></span>
							</label>
							<span className={classNames('text', 'post-list', 'check')}>{Words.ALL_CHECK}</span>
						</>
					)}
				</div>
				<div className={classNames('view-form', 'big')}>
					{getPostLoading && <img src={LoadingImage} alt="LoadingImage" />}
					{getPostFetchEnd && postCount === 0 && (
						<>
							<span className={classNames('text', 'no-post')}>{Words.NO_POST}</span>
							<br />
							<span className={classNames('text', 'no-post')}>{Words.WRITE_POST}</span>
						</>
					)}
					{getPostFetchEnd && search === '' && postList.slice(postStartIndex, postEndIndex).map((post) => <Post post={post} isDetail={false} key={post.id} />)}
					{getPostFetchEnd &&
						search !== '' &&
						postList
							.filter((post) => post.title.includes(search))
							.slice(postStartIndex, postEndIndex)
							.map((post) => <Post post={post} isDetail={false} key={post.id} />)}
				</div>
			</div>
			{postCount !== 0 && (
				<div className="footer">
					<div className="page-numbers">
						<img
							className="left-arrow"
							src={LeftArrow}
							alt="LeftArrow"
							onClick={() => {
								if (currentPage !== 1) {
									updateCurrentPage(currentPage - 1);
									if (currentPage % pageCount === 1) {
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
									if (currentPage % pageCount === 0) {
										updateStartEndPage(true);
									}
								}
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default PostList;
