import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useUserState } from '../contexts/UserContext';
import { useCategoryState } from '../contexts/CategoryContext';
import useAsync from '../hooks/useAsync';
import { getContents } from '../api/ContentsAPI';
import useInputs from '../hooks/useInputs';
import Words from '../common/Words';
import { isEmpty } from '../common/CheckValue';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/WritePost.scss';

function UpdatePost({ match }) {
	const { userToken } = useUserState();
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const { categoryList } = useCategoryState();
	const [getContentsState, getContentsRefetch, getContentsChangeFetchEnd] = useAsync(() => getContents(postIdNum, userToken));
	const { loading, data: contents, error, fetchEnd } = getContentsState;
	const [currentCategory, setCategory] = useState(null);
	const [form, onChange, setUpdatePostForm] = useInputs({
		title: '',
		description: '',
		tags: '',
		summaries: [],
	});
	const { title, description, tags, summaries } = form;

	if (loading) {
		return <img className="loading-image" src={LoadingImage} alt="LoadingImage" />;
	}
	if (fetchEnd) {
		setUpdatePostForm(contents);
		setCategory(contents.category.id);
		getContentsChangeFetchEnd();
	}

	const categoryHandler = (value) => {
		setCategory(value);
	};
	// postData와 confirmCancel은 AddPost와 중복되므로 common에 작성
	// postData함수명 변경해서 빈값만 확인하고 api호출은 컴포넌트에서 하도록 함
	const postData = (e) => {
		if (isEmpty(title)) {
			alert(Words.ENTER_TITLE);
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

	const checkCorrectTags = () => {
		const splitTags = tags.split(' ');
		const length = splitTags.length;
		let alertText = '';
		if (length > 30) {
			alertText = Words.LIMIT_TAGS_NUMBER;
		} else if (splitTags.indexOf(splitTags[length - 1]) !== length - 1) {
			alertText = `'${splitTags[length - 1]}' ${Words.DUPLICATE_TAGS}`;
		}
		alertText !== '' && alert(alertText);
		return alertText;
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
						<select
							value={currentCategory}
							onChange={(e) => {
								categoryHandler(e.target.value);
							}}
						>
							{categoryList.map((category) => {
								if (category.id !== 0) {
									return (
										<option value={category.id} key={category.id}>
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
							if (checkCorrectTags() === '') {
								onChange(e, 0, '', true);
							}
						}}
						onChange={(e) => {
							const isSpace = e.nativeEvent.data === ' ' ? true : false;
							if (isSpace) {
								if (checkCorrectTags() === '') {
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
						<Link to={`/viewPost/${postIdNum}`} className={classNames('write', 'write-link')} onClick={postData}>
							<button className={classNames('button', 'white', 'write-post', 'big')}>
								<span className={classNames('text', 'blue', 'write-post')}>{Words.UPDATE}</span>
							</button>
						</Link>
						<Link to={`/viewPost/${postIdNum}`} className={classNames('write', 'write-link')} onClick={confirmCancel}>
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

export default UpdatePost;
