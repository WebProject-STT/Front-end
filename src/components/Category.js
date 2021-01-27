import React from 'react';
import classNames from 'classnames';
import '../styles/Category.scss';
import '../styles/Text.scss';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import { useCheckStatusDispatch } from '../contexts/CheckStatusContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';

function Category({ categoryName }) {
	const { category } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const checkStatusDispatch = useCheckStatusDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const blueGray = '#ccd0de';

	const selectCategory = (categoryName) => {
		categoryDispatch({ type: 'SET_CATEGORY', value: categoryName });
		checkStatusDispatch({ type: 'RESET' });
		checkedItemsDispatch({ type: 'RESET_ITEM' });
	};

	return (
		<div
			className="category"
			onClick={() => {
				selectCategory(categoryName);
			}}
			style={{ background: category === categoryName ? blueGray : 'white' }}
		>
			<span className={classNames('text', 'bold', 'category')}>{categoryName}</span>
		</div>
	);
}

export default Category;
