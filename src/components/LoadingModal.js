import React from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import '../styles/Modal.scss';

function LoadingModal() {
	return (
		<div className={classNames('modal', 'loading')}>
			<span className={classNames('text', 'no-post')}>{Words.LOADING_UPLOAD_POST}</span>
			<br />
			<span className={classNames('text', 'no-post')}>{Words.WAIT}</span>
		</div>
	);
}

export default LoadingModal;
