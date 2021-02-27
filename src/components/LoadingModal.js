import React from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/Modal.scss';

function LoadingModal() {
	return (
		<div className={classNames('modal', 'loading')}>
			<span className={classNames('text', 'no-post')}>{Words.LOADING_UPLOAD_POST}</span>
			<br />
			<span className={classNames('text', 'no-post')}>{Words.WAIT}</span>
			<br />
			<img className="loading-image" src={LoadingImage} alt="LoadingImage" />
		</div>
	);
}

export default LoadingModal;
