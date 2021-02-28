import React from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import '../styles/ViewPost.scss';

function Contents({ contents }) {
	const { date, desc, origin, summaryList, tagList, title } = contents;

	return (
		<>
			<div className={classNames('contents-area', 'title')}>
				<span className={classNames('text', 'bold', 'post-detail', 'title')}>{title}</span>
				<div className={classNames('date-area')}>
					<span className={classNames('text', 'post-detail', 'date')}>{date.slice(0, 10)}</span>
				</div>
			</div>
			<div className={classNames('contents-area')}>
				{tagList.map((tag) => {
					return (
						<span className={classNames('text', 'gray', 'post-detail', 'keyword')} key={tag.id}>
							{`#${tag.name}`}
						</span>
					);
				})}
			</div>
			<div className={classNames('contents-area')}>
				<span className={classNames('text', 'post-detail')}>{desc}</span>
			</div>
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
