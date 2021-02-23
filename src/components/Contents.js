import React from 'react';
import classNames from 'classnames';
import { getContents } from '../api/ContentsAPI';
import useAsync from '../hooks/useAsync';
import { useUserState } from '../contexts/UserContext';
import Words from '../common/Words';
import '../styles/ViewPost.scss';

function Contents({ contents }) {
	const { userToken } = useUserState();
	const { title, date, tagList, desc, summaryList, origin } = contents;
	console.log(contents);
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
				{tagList.map((tag) => {
					return (
						<span className={classNames('text', 'gray', 'post-detail', 'keyword')} key={tag.id}>
							{tag.name}
						</span>
					);
				})}
			</div>
			<div className={classNames('contents-area')}>
				<span className={classNames('text', 'post-detail')}>{desc}</span>
			</div>
			{/* subjects 인덱스 div와 span태그에 넣어야됨 */}
			{summaryList.map((summary) => {
				return (
					<div className={classNames('contents-area', 'big')} key={`div_${summary.id}`}>
						<span className={classNames('text', 'bold', 'post-detail', 'subject-title')} key={`span_first_${summary.id}`}>
							{summary.title}
						</span>
						<span className={classNames('text', 'post-detail', 'subject-content')} key={`span_second_${summary.id}`}>
							{summary.desc}
						</span>
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
