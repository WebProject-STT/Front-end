import React, { useEffect } from 'react';
import axios from 'axios';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import Words from '../common/Words';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();
	const { categoryList } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();

	useEffect(() => {
		if (categoryList.length === 1) {
			axios
				.get('http://52.78.77.73:8080/category')
				.then((response) => {
					categoryDispatch({ type: 'SET_CATEGORY_LIST', value: response.data });
				})
				.catch((error) => {
					alert(`${error}${Words.REPORT_ERROR}`);
				});
		}
	}, [categoryList, categoryDispatch]);

	if (!categoryVisibility) {
		return null;
	}

	return (
		<div className="category-list">
			{categoryList.map((category) => (
				<Category categoryTitle={category.title} categoryId={category.id} key={category.id} />
			))}
		</div>
	);
}

export default CategoryList;
