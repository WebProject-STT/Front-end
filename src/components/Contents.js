import React from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import '../styles/ViewPost.scss';

function Contents({ contents }) {
	const { title, date, keywords, description, subjects, origin } = contents;

	return (
		<>
			<div className={classNames('contents-area', 'title')}>
				{/* <div className={classNames('title-area')}> */}
				<span className={classNames('text', 'bold', 'post-detail', 'title')}>{title}</span>
				{/* </div> */}
				<div className={classNames('date-area')}>
					<span className={classNames('text', 'post-detail', 'date')}>{date}</span>
				</div>
			</div>
			<div className={classNames('contents-area')}>
				{/* keyword 인덱스 span태그에 넣어야됨 */}
				{keywords.map((keyword) => {
					return <span className={classNames('text', 'gray', 'post-detail', 'keyword')}>{keyword}</span>;
				})}
			</div>
			<div className={classNames('contents-area')}>
				<span className={classNames('text', 'post-detail')}>{description}</span>
			</div>
			{/* subjects 인덱스 div와 span태그에 넣어야됨 */}
			{subjects.map((subject) => {
				return (
					<div className={classNames('contents-area', 'big')}>
						<span className={classNames('text', 'bold', 'post-detail', 'subject-title')}>{subject[0]}</span>
						<span className={classNames('text', 'post-detail', 'subject-content')}>{subject[1]}</span>
					</div>
				);
			})}
			<div className={classNames('contents-area', 'big')}>
				<span className={classNames('text', 'bold', 'post-detail', 'subject-title')}>{Words.ORIGIN}</span>
				<span className={classNames('text', 'post-detail', 'subject-content')}>{origin}</span>
			</div>
		</>
	);
}

export default Contents;
