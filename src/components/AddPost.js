import React, { useState } from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import useInputs from '../hooks/useInputs';
import { categoryNotIncludeAll } from '../common/TempData';
import '../styles/WritePost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function OptionData({ categoryName }) {
	return <option value={categoryName}>{categoryName}</option>;
}

function AddPost() {
	const [category, setCategory] = useState(categoryNotIncludeAll[0]);
	const [uploadFile, setUploadFile] = useState({
		fileName: Words.SELECT_FILE,
	});
	const { fileName } = uploadFile;
	const [form, onChange] = useInputs({ title: '', description: '' });
	const { title, description } = form;

	const categoryHandler = (value) => {
		setCategory(value);
	};

	const fileHandler = ({ target }) => {
		const _fileName = target.files[0].name;
		setUploadFile({
			fileName: _fileName,
		});
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
								categoryHandler(e);
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
					<div className={classNames('write', 'input', 'small')}>
						<div className={classNames('write', 'file-name')}>
							<span className={classNames('text', 'gray', 'file-name')}>{fileName}</span>
						</div>
						<input
							type="file"
							id="select-file"
							style={{ display: 'none' }}
							onChange={(e) => {
								e.target.files[0] && fileHandler(e);
							}}
							accept=".m4a"
						/>
						<label className={classNames('button', 'add-post', 'blue', 'small')} htmlFor="select-file">
							<span className={classNames('text', 'white', 'select')}>{Words.SELECT}</span>
						</label>
					</div>
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
