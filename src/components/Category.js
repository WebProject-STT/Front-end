import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import '../styles/Category.scss';
import '../styles/Text.scss';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import { useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { categoryList } from '../common/TempData';

function Category({ categoryId }) {
	const { category } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const checkStatusDispatch = useCheckStatusDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const blueGray = '#ccd0de';

	const selectCategory = () => {
		categoryDispatch({ type: 'SET_CATEGORY', value: categoryId });
		checkStatusDispatch({ type: 'RESET' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
	};

	return (
		<Link to={`/postList/${categoryId}`}>
			<div className="category" onClick={selectCategory} style={{ background: category === categoryId ? blueGray : 'white' }}>
				<span className={classNames('text', 'bold', 'category')}>{categoryList.find((category) => category.cg_id === categoryId).cg_title}</span>
			</div>
		</Link>
	);
}

export default Category;
