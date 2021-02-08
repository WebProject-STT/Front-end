import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Words from '../common/Words';
import { isEmpty } from '../common/CheckValue';
import useInputs from '../hooks/useInputs';
import { categoryNotIncludeAll } from '../common/TempData';
import '../styles/WritePost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function AddPost() {
	const [category, setCategory] = useState(categoryNotIncludeAll[0]);
	const [uploadFile, setUploadFile] = useState({
		fileName: Words.SELECT_FILE,
		fileInformation: null,
	});
	const { fileName, fileInformation } = uploadFile;
	const [form, onChange] = useInputs({ title: '', description: '' });
	const { title, description } = form;

	const categoryHandler = (value) => {
		setCategory(value);
	};

	const fileHandler = (selectFile) => {
		const _fileName = selectFile.name;
		setUploadFile({
			fileName: _fileName,
			fileInformation: selectFile,
		});
	};

	const getMessage = () => {
		let message = '';
		if (isEmpty(title)) {
			message = Words.ENTER_TITLE;
		} else if (fileName === Words.SELECT_FILE) {
			message = Words.SELECT_FILE;
		}
		return message;
	};

	const postData = (e) => {
		const message = getMessage();
		if (!isEmpty(message)) {
			alert(message);
			e.preventDefault();
		}
		// api호출하는 코드 작성, 데이터 업로드 성공시 postList로 이동
	};

	const confirmCancel = (e) => {
		const isConfirm = window.confirm(Words.ASK_ADD_CANCEL);
		if (!isConfirm) {
			e.preventDefault();
		}
	};

	return (
		<div className="write">
			<div className={classNames('write', 'input-form', 'add')}>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TITLE}</span>
					<input type="text" className={classNames('write', 'input', 'small')} name="title" placeholder={Words.ENTER_TITLE + Words.MAX_TITLE_LENGTH} value={title} onChange={onChange} />
				</div>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.CATEGORY}</span>
					<div className={classNames('write', 'input', 'small', 'category')}>
						<select
							value={category}
							onChange={(e) => {
								categoryHandler(e.target.value);
							}}
						>
							{categoryNotIncludeAll.map((categoryName, index) => {
								return (
									<option value={categoryName} key={index}>
										{categoryName}
									</option>
								);
							})}
						</select>
						<div className={classNames('write', 'select-arrow')} />
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.FILE}</span>
					<div className={classNames('write', 'input', 'small')}>
						<div className={classNames('write', 'file-name')}>
							<span className={classNames('text', 'gray', 'file-name')}>{fileName}</span>
						</div>
						<input
							type="file"
							id="select-file"
							onChange={(e) => {
								const selectFile = e.target.files[0];
								selectFile && fileHandler(selectFile);
							}}
							accept=".m4a"
						/>
						<label className={classNames('button', 'blue', 'write-post', 'small')} htmlFor="select-file">
							<span className={classNames('text', 'white', 'select-small')}>{Words.SELECT}</span>
						</label>
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'middle')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.DESCRIPTION}</span>
					<div className={classNames('write', 'input', 'big')}>
						<textarea type="text" name="description" placeholder={Words.ENTER_DESCRIPTION} value={description} onChange={onChange} />
						<div className={classNames('write', 'description')}>
							<div className={classNames('write', 'description', 'count')}>
								<span className={classNames('text', 'gray', 'description')}>
									({description.length}자/{Words.MAX_DESCRIPTION_LENGTH})
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'small')}>
					<div className={classNames('write', 'button-area')}>
						<Link to="/postList" className={classNames('write', 'write-link')} onClick={postData}>
							<button className={classNames('button', 'white', 'write-post', 'big')}>
								<span className={classNames('text', 'blue', 'write-post')}>{Words.SAVE}</span>
							</button>
						</Link>
						<Link to="/postList" className={classNames('write', 'write-link')} onClick={confirmCancel}>
							<button className={classNames('button', 'blue', 'write-post', 'big')}>
								<span className={classNames('text', 'white', 'write-post')}>{Words.CANCEL}</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddPost;
