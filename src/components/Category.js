import React from 'react';
import classNames from 'classnames';
import '../styles/Category.scss';
import '../styles/Text.scss';
import { useCategoryDispatch } from '../contexts/CategoryContext';

function Category({ category }) {
	const categoryDispatch = useCategoryDispatch();

	const selectCategory = (category) => {
		categoryDispatch({ type: 'SET_CATEGORY', value: category });
	};

	return (
		<div
			className="category"
			onClick={() => {
				selectCategory(category);
			}}
		>
			<span className={classNames('text', 'black', 'category')}>{category}</span>
		</div>
	);
}

export default Category;
