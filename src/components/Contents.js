import React from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import '../styles/ViewPost.scss';

function Contents({ contents }) {
	const { ct_title, ct_date, ct_keywords, ct_description, ct_subjects, ct_origin } = contents;

	return (
		<>
			<div className={classNames('contents-area', 'title')}>
				{/* <div className={classNames('title-area')}> */}
				<span className={classNames('text', 'bold', 'post-detail', 'title')}>{ct_title}</span>
				{/* </div> */}
				<div className={classNames('date-area')}>
					<span className={classNames('text', 'post-detail', 'date')}>{ct_date}</span>
				</div>
			</div>
			<div className={classNames('contents-area')}>
				{/* keyword 인덱스 span태그에 넣어야됨 */}
				{ct_keywords.map((keyword, index) => {
					return (
						<span className={classNames('text', 'gray', 'post-detail', 'keyword')} key={index}>
							{keyword}
						</span>
					);
				})}
			</div>
			<div className={classNames('contents-area')}>
				<span className={classNames('text', 'post-detail')}>{ct_description}</span>
			</div>
			{/* subjects 인덱스 div와 span태그에 넣어야됨 */}
			{ct_subjects.map((subject) => {
				return (
					<div className={classNames('contents-area', 'big')}>
						<span className={classNames('text', 'bold', 'post-detail', 'subject-title')}>{subject.sum_title}</span>
						<span className={classNames('text', 'post-detail', 'subject-content')}>{subject.sum_desc}</span>
					</div>
				);
			})}
			<div className={classNames('contents-area', 'big')}>
				<span className={classNames('text', 'bold', 'post-detail', 'subject-title')}>{Words.ORIGIN}</span>
				<span className={classNames('text', 'post-detail', 'subject-content')}>{ct_origin}</span>
			</div>
		</>
	);
}

export default Contents;
