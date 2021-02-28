import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import { isEmpty } from '../common/CheckValue';
import { useCategoryState, useCategoryDispatch } from '../contexts/CategoryContext';
import { useUserState } from '../contexts/UserContext';
import useInputs from '../hooks/useInputs';
import axios from 'axios';
import LoadingModal from './LoadingModal';
import '../styles/WritePost.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function AddPost({ history }) {
	const { userToken } = useUserState();
	const { categoryList } = useCategoryState();
	const categoryDispatch = useCategoryDispatch();
	const [category, setCategory] = useState(0);
	const [uploadFile, setUploadFile] = useState({
		fileName: Words.SELECT_FILE,
		fileInformation: null,
	});
	const [isLoadingModalOn, setIsLoadingModalOn] = useState(false);
	const { fileName, fileInformation } = uploadFile;
	const [inputForm, onChange] = useInputs({ title: '', description: '' });
	const { title, description } = inputForm;
	const contents = { category: category, desc: description, file: fileInformation, subject_nums: 2, title: title };

	useEffect(() => {
		return () => {
			categoryDispatch({ type: 'SET_CURRENT_CATEGORY', value: category });
		};
	}, [category, categoryDispatch]);

	const callPostContentsApi = async () => {
		const contentsData = new FormData();
		for (let elem in contents) {
			contentsData.append(elem, contents[elem]);
		}
		try {
			setIsLoadingModalOn(true);
			await axios
				.post('http://52.78.77.73:8080/contents', contentsData, {
					headers: {
						memberId: userToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response) => {
					setIsLoadingModalOn(false);
					if (response.data === 'change') {
						alert(Words.FAIL_UPLOAD_POST);
					} else {
						history.push(`/viewPost/${response.data}/${category}`);
					}
				});
		} catch (error) {
			setIsLoadingModalOn(false);
			alert(`${error}${Words.REPORT_ERROR}`);
		}
	};

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
		} else if (category === 0) {
			message = Words.SELECT_CATEGORY;
		} else if (fileName === Words.SELECT_FILE) {
			message = Words.SELECT_FILE;
		} else if (isEmpty(description)) {
			message = Words.ENTER_DESCRIPTION;
		}
		return message;
	};

	const postData = (e) => {
		const message = getMessage();
		if (!isEmpty(message)) {
			alert(message);
		} else {
			callPostContentsApi();
		}
	};

	const confirmCancel = (e) => {
		const isConfirm = window.confirm(Words.ASK_ADD_CANCEL);
		if (isConfirm) {
			history.goBack();
		}
	};

	return (
		<div className="write">
			<div className={classNames('write', 'input-form', 'add')}>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TITLE}</span>
					<div className={classNames('write', 'input', 'small')}>
						<input type="text" className={classNames('write', 'input-title')} name="title" placeholder={Words.ENTER_TITLE} value={title} onChange={onChange} />
						<div className={classNames('write', 'title', 'count')}>
							<span className={classNames('text', 'gray', 'description')}>
								({title.length}자/{Words.MAX_TITLE_LENGTH})
							</span>
						</div>
					</div>
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
							{categoryList.map((category) => {
								return (
									<option value={category.id} key={category.id}>
										{category.id === 0 ? Words.SELECT_CATEGORY : category.title}
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
							accept=".wav, .ogg, .flac, .mp3"
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
						<button type="submit" className={classNames('button', 'white', 'write-post', 'big')} onClick={postData}>
							<span className={classNames('text', 'blue', 'write-post')}>{Words.SAVE}</span>
						</button>
						<button className={classNames('button', 'blue', 'write-post', 'big')} onClick={confirmCancel}>
							<span className={classNames('text', 'white', 'write-post')}>{Words.CANCEL}</span>
						</button>
					</div>
				</div>
			</div>
			{isLoadingModalOn && <LoadingModal />}
		</div>
	);
}

export default AddPost;
