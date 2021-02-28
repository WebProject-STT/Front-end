import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Words from '../common/Words';
import { useUserState } from '../contexts/UserContext';
import LogoBlue from '../icon/LogoBlue.png';
import LoadingImage from '../icon/LoadingImage.gif';
import '../styles/Modal.scss';
import '../styles/Button.scss';
import '../styles/Text.scss';

function ChangeFileModal({ contentsId, getContentsRefetch, handleChangeFileModal }) {
	const { userToken } = useUserState();
	const [uploadFile, setUploadFile] = useState({
		fileName: Words.SELECT_FILE,
		fileInformation: null,
	});
	const { fileName, fileInformation } = uploadFile;
	const [loading, setLoading] = useState(false);
	const updateContents = { file: fileInformation, subject_nums: 2 };

	useEffect(() => {
		return () => {
			getContentsRefetch();
		};
	}, [getContentsRefetch]);

	if (loading) {
		return (
			<div className={classNames('modal', 'file', 'center')}>
				<span className={classNames('text', 'no-post')}>{Words.LOADING_UPLOAD_FILE}</span>
				<br />
				<span className={classNames('text', 'no-post')}>{Words.WAIT}</span>
				<br />
				<img className="loading-image" src={LoadingImage} alt="LoadingImage" />
			</div>
		);
	}

	const updateFile = async () => {
		const contentsData = new FormData();
		for (let elem in updateContents) {
			contentsData.append(elem, updateContents[elem]);
		}
		try {
			setLoading(true);
			await axios
				.post(`http://52.78.77.73:8080/contents/${contentsId}`, contentsData, {
					headers: {
						memberId: userToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response) => {
					setLoading(false);
					if (response.data === 'change') {
						alert(Words.FAIL_UPLOAD_POST);
					} else {
						handleChangeFileModal();
					}
				});
		} catch (error) {
			setLoading(false);
			alert(`${error}${Words.REPORT_ERROR}`);
		}
	};

	const fileHandler = (selectFile) => {
		const _fileName = selectFile.name;
		setUploadFile({
			fileName: _fileName,
			fileInformation: selectFile,
		});
	};

	const checkFile = () => {
		if (fileName === Words.SELECT_FILE) {
			alert(Words.SELECT_FILE);
		} else {
			updateFile();
		}
	};

	return (
		<div className={classNames('modal', 'file')}>
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
					accept=".wav, .ogg, .flac, .mp3"
				/>
				<label className={classNames('button', 'blue', 'file-change', 'select')} htmlFor="select-file">
					<span className={classNames('text', 'white', 'select-small')}>{Words.SELECT}</span>
				</label>
			</div>
			<div className="change-button">
				<button className={classNames('button', 'white', 'file-change', 'confirm')} onClick={checkFile}>
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
