import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useInputs from '../hooks/useInputs';
import { contentsData, categoryNotIncludeAll } from '../common/TempData';
import Words from '../common/Words';
import { isEmpty } from '../common/CheckValue';
import '../styles/WritePost.scss';

function UpdatePost({ match }) {
	const { postId } = match.params;
	const postIdNum = parseInt(postId);
	const { ct_title, ct_category, ct_keywords, ct_description, ct_subjects } = contentsData.find((x) => x.ct_id === postIdNum);
	const [category, setCategory] = useState(ct_category);
	// 키워드는 api에서 단어 받아서 한줄의 문자열로 만들어서 넣으면 됨
	const [form, onChange] = useInputs({
		title: ct_title,
		description: ct_description,
		keywords: ct_keywords
			.map((keyword) => {
				return keyword.tag_name;
			})
			.join(' '),
		subjects: ct_subjects,
	});
	const { title, description, keywords, subjects } = form;

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

	const checkCorrectKeywords = () => {
		const splitKeyWords = keywords.split(' ');
		console.log(splitKeyWords);
		const length = splitKeyWords.length;
		let alertText = '';
		if (length > 30) {
			alertText = Words.LIMIT_KEYWORDS_NUMBER;
		} else if (splitKeyWords.indexOf(splitKeyWords[length - 1]) !== length - 1) {
			alertText = `'${splitKeyWords[length - 1]}' ${Words.DUPLICATE_KEYWORDS}`;
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
					<span className={classNames('text', 'bold', 'title')}>{Words.KEYWORD}</span>
					<input
						type="text"
						className={classNames('write', 'input', 'small', 'keyword')}
						name="keywords"
						placeholder={Words.ENTER_KEYWORD}
						value={keywords}
						onFocus={(e) => {
							if (checkCorrectKeywords() === '') {
								onChange(e, 0, '', true);
							}
						}}
						onChange={(e) => {
							const isSpace = e.nativeEvent.data === ' ' ? true : false;
							if (isSpace) {
								if (checkCorrectKeywords() === '') {
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
					<div className={classNames('write', 'subject-title')}>
						<span className={classNames('text', 'bold', 'title')}>{Words.SUBJECT}</span>
					</div>
					<div className={classNames('write', 'subject-input')}>
						{subjects.map((subject) => {
							return (
								<>
									<input
										// 키 이름 바꿔주기
										// key={subject.sum_id}
										type="text"
										name="subjects"
										className={classNames('write', 'input', 'subject', 'small')}
										placeholder={Words.ENTER_SUBJECT_TITLE}
										value={subject.sum_title}
										onChange={(e) => {
											onChange(e, subject.sum_id, 'sum_title');
										}}
									/>
									<div className={classNames('write', 'input', 'subject', 'big')}>
										<textarea
											type="text"
											id="subject"
											key={subject.sum_id}
											name="subjects"
											placeholder={Words.ENTER_SUBJECT_CONTENT}
											value={subject.sum_desc}
											onChange={(e) => {
												onChange(e, subject.sum_id, 'sum_desc');
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
