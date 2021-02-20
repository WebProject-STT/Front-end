import React, { useEffect } from 'react';
import axios from 'axios';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();
	const { categoryList } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();

	useEffect(() => {
		async function getCategoryList() {
			const response = await axios.get('http://52.78.77.73:8080/category');
			categoryDispatch({ type: 'SET_CATEGORY_LIST', value: response.data });
		}

		if (categoryList.length === 1) {
			getCategoryList();
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
