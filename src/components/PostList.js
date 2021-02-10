import React, { useEffect } from 'react';
import classNames from 'classnames';
import Post from './Post';
import { useComponentVisibilityDispatch } from '../contexts/ComponentVisibilityContext';
import { useCheckStatusState, useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCategoryState } from '../contexts/CategoryContext';
import { useCheckedItemsState, useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import { getPostList } from '../common/getInformation';
import SearchIcon from '../common/icon/SearchIcon.png';
import LeftArrow from '../common/icon/LeftArrow.png';
import RightArrow from '../common/icon/RightArrow.png';
import '../styles/ViewPost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';
import { Link } from 'react-router-dom';
// postlist-header 컴포넌트화 시킬까 생각중..

function PostList() {
	const { category } = useCategoryState();
	const { checkedItems } = useCheckedItemsState();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const componentVisibilityDispatch = useComponentVisibilityDispatch();
	const { checkBoxVisibility, isAllChecked } = useCheckStatusState();
	const checkStatusDispatch = useCheckStatusDispatch();
	const [form, onChange] = useInputs({ search: '' });
	const { search } = form;
	const postList = getPostList(category);

	const resetCheckedItems = () => {
		checkStatusDispatch({ type: 'SET_FALSE', name: 'isAllChecked' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
	};

	useEffect(() => {
		componentVisibilityDispatch({ type: 'VISIBLE', name: 'categoryVisibility' });
		return () => {
			componentVisibilityDispatch({ type: 'INVISIBLE', name: 'categoryVisibility' });
		};
	}, [componentVisibilityDispatch]);

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
					{postList.length === 0 && (
						<>
							<span className={classNames('text', 'no-post')}>{Words.NO_POST}</span>
							<br />
							<span className={classNames('text', 'no-post')}>{Words.WRITE_POST}</span>
						</>
					)}
					{search === ''
						? postList.map((post) => <Post post={post} isDetail={false} key={post.id} />)
						: postList.filter((post) => post.title.includes(search)).map((post) => <Post post={post} isDetail={false} key={post.id} />)}
				</div>
				<div className="footer">
					<img className="left-arrow" src={LeftArrow} alt="LeftArrow" />
					<img className="right-arrow" src={RightArrow} alt="RightArrow" />
				</div>
			</div>
		</div>
	);
}

export default PostList;
