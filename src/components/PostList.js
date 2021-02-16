import React, { useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Post from './Post';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusState, useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsState, useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import useInputs from '../hooks/useInputs';
import usePagination from '../hooks/usePagination';
import useAsync from '../hooks/useAsync';
import Words from '../common/Words';
import { getPostList, getPageArray } from '../common/getInformation';
// import { getAllPostList, getPostList } from '../api/PostAPI';
import SearchIcon from '../icon/SearchIcon.png';
import LeftArrow from '../icon/LeftArrow.png';
import RightArrow from '../icon/RightArrow.png';
import '../styles/ViewPost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';
// postlist-header 컴포넌트화 시킬까 생각중..

function PostList({ match }) {
	const pageCount = 10;
	const { categoryId } = match.params;
	const categoryIdNum = parseInt(categoryId);
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const { checkBoxVisibility, isAllChecked } = useCheckStatusState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const [form, onChange] = useInputs({ search: '' });
	const { search } = form;
	const [pagination, updateCurrentPage, updateStartEndPage] = usePagination(pageCount);
	const { currentPage, start, end } = pagination;
	// const [apiState, refetch] = useAsync(categoryIdNum === 1 ? getAllPostList : getPostList , []);
	// const { loading, data: postList, error } = apiState;
	const postList = getPostList(categoryIdNum);
	const postCount = useMemo(() => postList.length, [postList]);
	const pageMaxIndex = Math.ceil(postCount / pageCount);
	const pageArray = getPageArray(pageMaxIndex).slice(start, end);
	const postStartIndex = (currentPage - 1) * pageCount;
	const postEndIndex = currentPage * pageCount;

	useEffect(() => {
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

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
				if (!checkedItems.includes(post.ct_id)) {
					checkedItemsDispatch({ type: 'ADD_ITEM', item: post.ct_id });
				}
			});
		} else {
			resetCheckedItems();
		}
	};

	const confirmDelete = () => {
		const isConfirm = window.confirm(Words.ASK_DELETE_POSTS);
		if (isConfirm) {
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
					<button className={classNames('button', 'view', 'blue', 'list')} onClick={checkBoxHandler} id={!checkBoxVisibility && 'delete'}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{checkBoxVisibility ? Words.CANCEL : Words.DELETE}</span>
					</button>
				</div>
			</div>
			<div className={classNames('post-view', 'list')}>
				<div className="all-check">
					{checkBoxVisibility && (
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
					{/* {loading && <>
							<span className={classNames('text', 'no-post')}>{Words.LOADING_GET_POST}</span>
							<br />
							<span className={classNames('text', 'no-post')}>{Words.WAIT}</span>
						</>} */}
					{postList.length === 0 && (
						<>
							<span className={classNames('text', 'no-post')}>{Words.NO_POST}</span>
							<br />
							<span className={classNames('text', 'no-post')}>{Words.WRITE_POST}</span>
						</>
					)}
					{search === ''
						? postList.slice(postStartIndex, postEndIndex).map((post) => <Post id={post.ct_id} title={post.ct_title} date={post.ct_date} isDetail={false} key={post.ct_id} />)
						: postList
								.filter((post) => post.ct_title.includes(search))
								.slice(postStartIndex, postEndIndex)
								.map((post) => <Post id={post.ct_id} title={post.ct_title} date={post.ct_date} isDetail={false} key={post.ct_id} />)}
				</div>
				{postList.length !== 0 && (
					<div className="footer">
						<img
							className="left-arrow"
							src={LeftArrow}
							alt="LeftArrow"
							onClick={() => {
								if (currentPage !== 1) {
									updateCurrentPage(currentPage - 1);
									// pageCount 변수명 변경, 한페이지에 놓은 post수 / 페이지 갯수 변수 두개 설정
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
									if (currentPage % pageCount === 0) {
										updateStartEndPage(true);
									}
								}
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default PostList;
