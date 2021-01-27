import React, { useState } from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import useInputs from '../hooks/useInputs';
import { categoryNotIncludeAll } from '../common/TempData';
import '../styles/WritePost.scss';
import '../styles/Text.scss';

function OptionData({ categoryName }) {
	return <option value={categoryName}>{categoryName}</option>;
}

function AddPost() {
	const [category, setCategory] = useState(categoryNotIncludeAll[0]);
	const [form, onChange] = useInputs({ title: '', description: '' });
	const { title, description } = form;

	const changeHandler = ({ target }) => {
		setCategory(target.value);
	};

	return (
		<div className="write">
			<div className={classNames('write', 'input-form')}>
				<div className={classNames('write', 'input-area')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TITLE}</span>
					<input className={classNames('write', 'input', 'small')} name="title" placeholder={Words.ENTER_TITLE} value={title} onChange={onChange} />
				</div>
				<div className={classNames('write', 'input-area')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TOPIC}</span>
					<div className={classNames('write', 'input', 'small')}>
						<select
							value={category}
							onChange={(e) => {
								changeHandler(e);
							}}
						>
							{categoryNotIncludeAll.map((categoryName, index) => (
								<OptionData categoryName={categoryName} key={index} />
							))}
						</select>
						<div className={classNames('write', 'select-arrow')} />
					</div>
				</div>
				<div className={classNames('write', 'input-area')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.FILE}</span>
					<input className={classNames('write', 'input', 'small')} />
				</div>
				<div className={classNames('write', 'input-area')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.DESCRIPTION}</span>
					<input className={classNames('write', 'input', 'small')} name="description" placeholder={Words.ENTER_DESCRIPTION} value={description} onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default AddPost;
