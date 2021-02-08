import React from 'react';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { categoryIncludeAll } from '../common/TempData';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();

	if (!categoryVisibility) {
		return null;
	}

	return (
		<div className="category-list">
			{categoryIncludeAll.map((categoryName, index) => (
				<Category categoryName={categoryName} key={index} />
			))}
		</div>
	);
}

export default CategoryList;
