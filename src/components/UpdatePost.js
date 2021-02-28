import React, { useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { useUserState } from '../contexts/UserContext';
import { useCategoryState } from '../contexts/CategoryContext';
import useAsync from '../hooks/useAsync';
import { getContents } from '../api/ContentsAPI';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import { isEmpty, checkCorrectTags } from '../common/CheckValue';
import { getObjectTags } from '../common/getInformation';
import LoadingModal from './LoadingModal';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/WritePost.scss';

function UpdatePost({ match, history }) {
	const { userToken } = useUserState();
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const { categoryList } = useCategoryState();
	const [currentCategory, setCategory] = useState({ id: 0, title: '' });
	const [isLoadingModalOn, setIsLoadingModalOn] = useState(false);
	const [form, onChange, setUpdatePostForm] = useInputs({
		title: '',
		description: '',
		tags: '',
		summaries: [],
	});
	const { title, description, tags, summaries } = form;
	const [getContentsState, getContentsRefetch, getContentsChangeFetchEnd] = useAsync(() => getContents(postIdNum, userToken));
	const { loading: getContentsLoading, data: contents, fetchEnd: getContentsFetchEnd } = getContentsState;
	const updateContentsParameter = { category: currentCategory, desc: description, origin: contents.origin, summaryList: summaries, tagList: getObjectTags(tags), title: title };

	if (getContentsLoading) {
		return (
			<div className={classNames('write', 'loading-div')}>
				<img src={LoadingImage} alt="LoadingImage" />
			</div>
		);
	}
	if (getContentsFetchEnd) {
		setUpdatePostForm(contents);
		setCategory({ id: contents.category.id, title: contents.category.title });
		getContentsChangeFetchEnd();
	}

	const categoryHandler = (e) => {
		const categoryOptions = e.target.options;
		const selectOption = categoryOptions[categoryOptions.selectedIndex];
		setCategory({ id: selectOption.value, title: selectOption.name });
	};

	const callUpdateContentsApi = async () => {
		try {
			setIsLoadingModalOn(true);
			await axios
				.put(`http://52.78.77.73:8080/contents/${postIdNum}`, updateContentsParameter, {
					headers: {
						memberId: userToken,
						'Content-Type': 'application/json',
					},
				})
				.then((response) => {
					setIsLoadingModalOn(false);
					history.push(`/viewPost/${postIdNum}/${currentCategory.id}`);
				});
		} catch (error) {
			setIsLoadingModalOn(false);
			alert(`${error}${Words.REPORT_ERROR}`);
		}
	};

	const getMessage = () => {
		let message = '';
		if (isEmpty(title)) {
			message = Words.ENTER_TITLE;
		} else if (isEmpty(description)) {
			message = Words.ENTER_DESCRIPTION;
		}
		return message;
	};

	const updateContents = () => {
		const message = getMessage();
		if (!isEmpty(message)) {
			alert(message);
		} else {
			callUpdateContentsApi();
		}
	};

	const confirmCancel = () => {
		const isConfirm = window.confirm(Words.ASK_ADD_CANCEL);
		if (isConfirm) {
			history.goBack();
		}
	};

	return (
		<div className="write">
			<div className={classNames('write', 'input-form', 'update')}>
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
						<select value={currentCategory.id} onChange={categoryHandler}>
							{categoryList.map((category) => {
								if (category.id !== 0) {
									return (
										<option value={category.id} name={category.title} key={category.id}>
											{category.title}
										</option>
									);
								}
							})}
						</select>
						<div className={classNames('write', 'select-arrow')} />
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TAG}</span>
					<input
						type="text"
						className={classNames('write', 'input', 'small', 'tag')}
						name="tags"
						placeholder={Words.ENTER_TAG}
						value={tags}
						onFocus={(e) => {
							if (checkCorrectTags(tags) === '') {
								onChange(e, 0, '', true);
							}
						}}
						onChange={(e) => {
							const isSpace = e.nativeEvent.data === ' ' ? true : false;
							if (isSpace) {
								if (checkCorrectTags(tags) === '') {
									onChange(e, 0, '', false, isSpace);
								}
							} else {
								onChange(e, 0, '', false, isSpace);
							}
						}}
					/>
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
				<div className={classNames('write', 'input-area', 'big')}>
					<div className={classNames('write', 'summary-title')}>
						<span className={classNames('text', 'bold', 'title')}>{Words.SUMMARY}</span>
					</div>
					<div className={classNames('write', 'summary-input')}>
						{summaries.map((summary) => {
							return (
								<div key={`firstDiv${summary.id}`}>
									<input
										key={`input${summary.id}`}
										type="text"
										name="summaries"
										className={classNames('write', 'input', 'summary', 'small')}
										placeholder={Words.ENTER_SUMMARY_TITLE}
										value={summary.title}
										onChange={(e) => {
											onChange(e, summary.id, 'title');
										}}
									/>
									<div className={classNames('write', 'input', 'summary', 'big')} key={`secondDiv${summary.id}`}>
										<textarea
											type="text"
											id="summary"
											key={`textarea${summary.id}`}
											name="summaries"
											placeholder={Words.ENTER_SUMMARY_CONTENT}
											value={summary.desc}
											onChange={(e) => {
												onChange(e, summary.id, 'desc');
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'small', 'update')}>
					<div className={classNames('write', 'button-area')}>
						<button className={classNames('button', 'white', 'write-post', 'big')} onClick={updateContents}>
							<span className={classNames('text', 'blue', 'write-post')}>{Words.UPDATE}</span>
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

export default UpdatePost;
