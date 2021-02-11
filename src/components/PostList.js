import React, { useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Post from './Post';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusState, useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import { useCheckedItemsState, useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import useInputs from '../hooks/useInputs';
import useAsync from '../hooks/useAsync';
import Words from '../common/Words';
import { getPostList } from '../common/getInformation';
import SearchIcon from '../common/icon/SearchIcon.png';
import LeftArrow from '../common/icon/LeftArrow.png';
import RightArrow from '../common/icon/RightArrow.png';
import '../styles/ViewPost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';
// postlist-header 컴포넌트화 시킬까 생각중..

// async function getAllPostList() {
// 	const response = await axios.get('http://virtserver.swaggerhub.com/Kim-SuBin/S-STT/1.0.0/contents');
// 	return response.data;
// }

// async function getPostList(category) {
// 	const response = await axios.get(`http://virtserver.swaggerhub.com/Kim-SuBin/S-STT/1.0.0/contents${category}`);
// 	return response.data;
// }

function PostList({ match }) {
	const { categoryId } = match.params;
	const categoryIdNum = parseInt(categoryId);
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const { checkBoxVisibility, isAllChecked } = useCheckStatusState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const [form, onChange] = useInputs({ search: '' });
	const { search } = form;
	// const [apiState, refetch] = useAsync(getPostList, []);
	// const { loading, data: postList, error } = apiState;
	const postList = getPostList(categoryIdNum);

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
						<Link to="/AddPost" className="link">
							<button className={classNames('button', 'view', 'white', 'add')}>
								<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.ADD}</span>
							</button>
						</Link>
					)}
					<button className={classNames('button', 'view', 'blue', 'list')} onClick={checkBoxHandler}>
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
						? postList.map((post) => <Post id={post.ct_id} title={post.ct_title} date={post.ct_date} isDetail={false} key={post.ct_id} />)
						: postList.filter((post) => post.ct_title.includes(search)).map((post) => <Post id={post.ct_id} title={post.ct_title} date={post.ct_date} isDetail={false} key={post.ct_id} />)}
				</div>
				{postList.length !== 0 && (
					<div className="footer">
						<img className="left-arrow" src={LeftArrow} alt="LeftArrow" />
						<img className="right-arrow" src={RightArrow} alt="RightArrow" />
					</div>
				)}
			</div>
		</div>
	);
}

export default PostList;
