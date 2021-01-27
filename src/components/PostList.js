import React, { useEffect } from 'react';
import classNames from 'classnames';
import Post from './Post';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusState, useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCategoryState } from '../contexts/CategoryContext';
import { useCheckedItemsState, useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import { postsData } from '../common/TempData';
import SearchIcon from '../common/icon/SearchIcon.png';
import LeftArrow from '../common/icon/LeftArrow.png';
import RightArrow from '../common/icon/RightArrow.png';
import '../styles/ViewPost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';
import { Link } from 'react-router-dom';
// postlist-header 컴포넌트화 시킬까 생각중..
function getPostList(category) {
	const postList = category === '전체' ? postsData : postsData.filter((post) => post.category === category);
	return postList;
}

function PostList() {
	const { category } = useCategoryState();
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const { checkBoxVisibility, isAllChecked } = useCheckStatusState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const [form, onChange] = useInputs({ title: '' });
	const { title } = form;
	const postList = getPostList(category);
	console.log(checkedItems);

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
				if (!checkedItems.includes(post.id)) {
					checkedItemsDispatch({ type: 'ADD_ITEM', item: post.id });
				}
			});
		} else {
			resetCheckedItems();
		}
	};

	const confirmDelete = () => {
		const confirmFlag = window.confirm(Words.ASK_POST_DELETE);
		if (confirmFlag) {
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
		<div className="post-list">
			<div className="list-header">
				<div className={classNames('list-header', 'search-area')}>
					<div className="search-form">
						<img className="search-icon" src={SearchIcon} alt="SearchIcon" />
						<input className="search-input" name="title" placeholder={Words.SEARCH} value={title} onChange={onChange} />
					</div>
					<button className={classNames('button', 'post-list', 'blue', 'small')}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{Words.SEARCH}</span>
					</button>
				</div>
				<div className={classNames('list-header', 'button-area')}>
					{checkBoxVisibility ? (
						<button className={classNames('button', 'post-list', 'white', 'big')} onClick={confirmItemsNull}>
							<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.DELETE}</span>
						</button>
					) : (
						<Link to="/AddPost" className="link">
							<button className={classNames('button', 'post-list', 'white', 'add')}>
								<span className={classNames('text', 'blue', 'post-list', 'small')}>{Words.ADD}</span>
							</button>
						</Link>
					)}
					<button className={classNames('button', 'post-list', 'blue', 'big')} onClick={checkBoxHandler}>
						<span className={classNames('text', 'white', 'post-list', 'small')}>{checkBoxVisibility ? Words.CANCEL : Words.DELETE}</span>
					</button>
				</div>
			</div>
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
			<div className="list-form">
				{postList.length === 0 ? (
					<>
						<span className={classNames('text', 'no-post')}>{Words.NO_POST}</span>
						<br />
						<span className={classNames('text', 'no-post')}>{Words.WRITE_POST}</span>
					</>
				) : (
					postList.map((post) => <Post post={post} key={post.id} />)
				)}
			</div>
			<div className="footer">
				<img className="left-arrow" src={LeftArrow} alt="LeftArrow" />
				<img className="right-arrow" src={RightArrow} alt="RightArrow" />
			</div>
		</div>
	);
}

export default PostList;
