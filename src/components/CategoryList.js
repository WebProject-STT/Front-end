import React from 'react';
import classNames from 'classnames';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { categoryData } from '../common/tempData';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();

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
