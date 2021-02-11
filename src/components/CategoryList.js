import React from 'react';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { categoryList } from '../common/TempData';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();

	if (!categoryVisibility) {
		return null;
	}

	return (
		<div className="category-list">
			{categoryList.map((category) => (
				<Category categoryName={category.cg_title} key={category.cg_id} />
			))}
		</div>
	);
}

export default CategoryList;
