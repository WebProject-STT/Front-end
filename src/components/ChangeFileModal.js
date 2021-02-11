import React, { useState } from 'react';
import classNames from 'classnames';
import Words from '../common/Words';
import LogoBlue from '../icon/LogoBlue.png';
import '../styles/FileModal.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function ChangeFileModal({ handleChangeFileModal }) {
	const [uploadFile, setUploadFile] = useState({
		fileName: Words.SELECT_FILE,
		fileInformation: null,
	});
	const { fileName, fileInformation } = uploadFile;

	const fileHandler = (selectFile) => {
		const _fileName = selectFile.name;
		setUploadFile({
			fileName: _fileName,
			fileInformation: selectFile,
		});
	};

	const changeFile = () => {
		// 파일 변경하는 api호출
		handleChangeFileModal();
	};

	return (
		<div className="file-modal">
			<div className="file-header">
				<img className="file-logo" src={LogoBlue} alt="LogoBlue" />
				<span className={classNames('text', 'bold', 'modal-title')}>{Words.CHANGE_FILE}</span>
			</div>
			<div className="change-select">
				<div className={classNames('write', 'file-name')}>
					<span className={classNames('text', 'gray', 'file-name', 'change')}>{fileName}</span>
				</div>
				<input
					type="file"
					id="select-file"
					onChange={(e) => {
						const selectFile = e.target.files[0];
						selectFile && fileHandler(selectFile);
					}}
					accept=".m4a"
				/>
				<label className={classNames('button', 'blue', 'file-change', 'select')} htmlFor="select-file">
					<span className={classNames('text', 'white', 'select-small')}>{Words.SELECT}</span>
				</label>
			</div>
			<div className="change-button">
				<button className={classNames('button', 'white', 'file-change', 'confirm')} onClick={changeFile}>
					<span className={classNames('text', 'blue', 'select-big')}>{Words.UPDATE}</span>
				</button>
				<button className={classNames('button', 'blue', 'file-change', 'confirm')} onClick={handleChangeFileModal}>
					<span className={classNames('text', 'white', 'select-big')}>{Words.CANCEL}</span>
				</button>
			</div>
		</div>
	);
}

export default ChangeFileModal;
