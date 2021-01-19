import React from 'react';
import classNames from 'classnames';
import '../styles/Category.scss';
import '../styles/Text.scss';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';

function Category({ categoryName }) {
	const { category } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const blueGray = '#ccd0de';

	const selectCategory = (categoryName) => {
		categoryDispatch({ type: 'SET_CATEGORY', value: categoryName });
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
