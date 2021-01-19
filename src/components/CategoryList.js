import React from 'react';
import classNames from 'classnames';
import Category from './Category';
import { useVisibilityState } from '../contexts/VisibilityContext';
import { categoryData } from '../common/tempData';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useVisibilityState();

	if (!categoryVisibility) {
		return null;
	}

	return (
		<div className="category-list">
			{categoryData.map((categoryName, index) => (
				<Category categoryName={categoryName} key={index} />
			))}
		</div>
	);
}

export default CategoryList;
