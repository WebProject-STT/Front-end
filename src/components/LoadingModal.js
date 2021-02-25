import React from 'react';
import classNames from 'classnames';
import '../styles/Modal.scss';

function LoadingModal() {
	return <div className={classNames('modal', 'file')}>글 업로드하는중 기둘...</div>;
}

export default LoadingModal;
