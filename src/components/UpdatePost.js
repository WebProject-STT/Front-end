import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useUserState } from '../contexts/UserContext';
import { useCategoryState } from '../contexts/CategoryContext';
import useAsync from '../hooks/useAsync';
import { getContents, updateContents } from '../api/ContentsAPI';
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
	const [currentCategory, setCategory] = useState({ id: null, title: null });
	const [form, onChange, setUpdatePostForm] = useInputs({
		title: '',
		description: '',
		tags: '',
		summaries: [],
	});
	const { title, description, tags, summaries } = form;
	const [getContentsState, getContentsRefetch, getContentsChangeFetchEnd] = useAsync(() => getContents(postIdNum, userToken));
	const { loading: getContentsLoading, data: contents, error: getContentsError, fetchEnd: getContentsFetchEnd } = getContentsState;
	const [updateContentsState, updateContentsRefetch, updateContentsChangeFetchEnd] = useAsync(
		() => updateContents(postIdNum, { category: currentCategory, desc: description, origin: contents.origin, summaryList: summaries, tagList: getObjectTags(tags), title: title }, userToken),
		[],
		true
	);
	const { loading: updateContentsLoading, data: isUpdateContents, error: updateContentsError, fetchEnd: updateContentsFetchEnd } = updateContentsState;

	if (getContentsLoading) {
		return <img className="loading-image" src={LoadingImage} alt="LoadingImage" />;
	}
	if (getContentsFetchEnd) {
		setUpdatePostForm(contents);
		setCategory({ id: contents.category.id, title: contents.category.title });
		getContentsChangeFetchEnd();
	}
	if (updateContentsLoading) {
		return <LoadingModal />;
	}
	if (updateContentsFetchEnd) {
		updateContentsChangeFetchEnd();
		history.goBack();
	}

	const categoryHandler = (e) => {
		const categoryOptions = e.target.options;
		const selectOption = categoryOptions[categoryOptions.selectedIndex];
		setCategory({ id: selectOption.value, title: selectOption.name });
	};
	// 이것도 공통함수로 뺄 수 있음 수정하기
	// const getMessage = () => {
	// 	let message = '';
	// 	if (isEmpty(title)) {
	// 		message = Words.ENTER_TITLE;
	// 	} else if (isEmpty(tags)) {
	// 		message = Words.ENTER_TAG;
	// 	} else if (isEmpty(description)) {
	// 		message = Words.ENTER_DESCRIPTION;
	// 	}
	// 	else {

	// 	}
	// 	return message;
	// };

	// postData와 confirmCancel은 AddPost와 중복되므로 common에 작성
	// postData함수명 변경해서 빈값만 확인하고 api호출은 컴포넌트에서 하도록 함
	const postData = (e) => {
		if (isEmpty(title)) {
			alert(Words.ENTER_TITLE);
		} else {
			updateContentsRefetch();
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
			<div className={classNames('write', 'input-form', 'update')}>
				<div className={classNames('write', 'input-area', 'small')}>
					<span className={classNames('text', 'bold', 'title')}>{Words.TITLE}</span>
					<input type="text" className={classNames('write', 'input', 'small')} name="title" placeholder={Words.ENTER_TITLE + Words.MAX_TITLE_LENGTH} value={title} onChange={onChange} />
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
								<>
									<input
										// 키 이름 바꿔주기
										// key={subject.sum_id}
										type="text"
										name="summaries"
										className={classNames('write', 'input', 'summary', 'small')}
										placeholder={Words.ENTER_SUMMARY_TITLE}
										value={summary.title}
										onChange={(e) => {
											onChange(e, summary.id, 'title');
										}}
									/>
									<div className={classNames('write', 'input', 'summary', 'big')}>
										<textarea
											type="text"
											id="summary"
											key={summary.id}
											name="summaries"
											placeholder={Words.ENTER_SUMMARY_CONTENT}
											value={summary.desc}
											onChange={(e) => {
												onChange(e, summary.id, 'desc');
											}}
										/>
									</div>
								</>
							);
						})}
					</div>
				</div>
				<div className={classNames('write', 'input-area', 'small', 'update')}>
					<div className={classNames('write', 'button-area')}>
						{/* <Link to={`/viewPost/${postIdNum}`} className={classNames('write', 'write-link')} onClick={postData}> */}
						<button className={classNames('button', 'white', 'write-post', 'big')} onClick={postData}>
							<span className={classNames('text', 'blue', 'write-post')}>{Words.UPDATE}</span>
						</button>
						{/* </Link> */}
						{/* <Link to={`/viewPost/${postIdNum}/${contents.category.id}`} className={classNames('write', 'write-link')} onClick={confirmCancel}> */}
						<button className={classNames('button', 'blue', 'write-post', 'big')} onClick={confirmCancel}>
							<span className={classNames('text', 'white', 'write-post')}>{Words.CANCEL}</span>
						</button>
						{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdatePost;
