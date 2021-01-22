import React from 'react';
import classNames from 'classnames';
import '../styles/Category.scss';
import '../styles/Text.scss';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import { useCheckBoxVisibilityDispatch } from '../contexts/CheckBoxVisibilityContext';
import { useCheckedItemsDispatch } from '../contexts/CheckedItemContext';
import { useIsAllCheckedDispatch } from '../contexts/IsAllCheckedContext';

function Category({ categoryName }) {
	const { category } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const CheckBoxvisibilityDispatch = useCheckBoxVisibilityDispatch();
	const checkedItemsDispatch = useCheckedItemsDispatch();
	const isAllCheckedDispatch = useIsAllCheckedDispatch();
	const blueGray = '#ccd0de';

	const selectCategory = (categoryName) => {
		isAllCheckedDispatch({ type: 'NOT_CHECKED' });
		categoryDispatch({ type: 'SET_CATEGORY', value: categoryName });
		CheckBoxvisibilityDispatch({ type: 'CHECKBOX_INVISIBLE' });
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
			<span className={classNames('text', 'black', 'category')}>{categoryName}</span>
		</div>
	);
}

export default Category;
