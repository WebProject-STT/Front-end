import React, { useEffect } from 'react';
import axios from 'axios';
import Category from './Category';
import { useComponentVisibilityState } from '../contexts/ComponentVisibilityContext';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import useAsync from '../hooks/useAsync';
import { getCategoryList } from '../api/CategoryAPI';
import Words from '../common/Words';
import '../styles/Category.scss';

function CategoryList() {
	const { categoryVisibility } = useComponentVisibilityState();
	const { categoryList } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const [getCategoryState, getCategoryRefetch, getCategoryChangeFetchEnd] = useAsync(getCategoryList, [], true);
	const { loading, data, fetchEnd } = getCategoryState;

	useEffect(() => {
		if (categoryList.length === 1) {
			getCategoryRefetch();
		}
	}, [categoryList, categoryDispatch]);

	if (fetchEnd) {
		categoryDispatch({ type: 'SET_CATEGORY_LIST', value: data });
		getCategoryChangeFetchEnd();
	}

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
