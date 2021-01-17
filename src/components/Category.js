import React from 'react';
import classNames from 'classnames';
import '../styles/Category.scss';
import '../styles/Text.scss';

function Category({ category }) {
	return (
		<div className="category" name={category}>
			<span className={classNames('text', 'black', 'category')}>{category}</span>
		</div>
	);
}

export default Category;
