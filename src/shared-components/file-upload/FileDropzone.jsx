// Material UI Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// Material UI core
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import LoadingState from "@/shared-constants/loading-states";
// Custom Components
// 3rd party libs
import { useWebApi } from "@/shared-hooks/useWebApi";
import FlexBox from "../FlexBox";
import FileDropzoneBox from "./FileDropzoneBox";
import FileProgress from "./FileProgress";

const PromptBox = ({ children, ...rest }) => {
	return (
		<Box pt={1} {...rest}>
			<FlexBox
				sx={{
					justifyContent: "center",
					alignItems: "center",
					// flexDirection: horizontal ? "row" : "column",
					flexDirection: "column",
				}}>
				{children}
			</FlexBox>
		</Box>
	);
};

const PromptTypography = ({ children, ...rest }) => {
	return (
		<Typography
			variant="body1"
			sx={{
				color: "rgb(162, 162, 162)",
				marginLeft: "1em",
			}}
			{...rest}>
			{children}
		</Typography>
	);
};

const FileDropzone = (props) => {
	const {
		readOnly,
		uploadUrl,
		httpMethod = "post",
		uploadOnDrop = true,
		children,
		disabled,
		disabledPrompt = "(暫停上傳)",
		dragActivePrompt = "放開即開始上傳",
		dragRejectPrompt = "不接受拖放的檔案，請檢查檔案類型及檔案大小是否符合規定",
		className,
		dropPrompt = "請拖曳檔案至此，或直接點擊圖示開始上傳",
		promptProps,
		accept,
		validateFiles,
		// EVENTS
		onDropAccepted,
		onDropRejected,
		onUploaded,
		onAllUploaded,
		onUploadError,
		...rest
	} = props;

	const { sendAsync } = useWebApi();
	const [state, setState] = useState({
		current: null,
		uploading: [],
		uploaded: [],
		loading: null,
		progress: 0,
	});

	const handleUploadError = useCallback(
		(f, e) => {
			if (onUploadError) {
				onUploadError(f);
			}
			console.error(`${f.name} failed to upload`);
			console.error(e);
		},
		[onUploadError]
	);

	const handleUpload = useCallback(
		async (uploadingFile) => {
			// console.log(`building FormData for [${uploadingFile.name}]...`);
			console.log("handleUpload", uploadingFile);
			let formData = new FormData();

			formData.append("file", uploadingFile, uploadingFile.name);

			setState((prevState) => {
				return {
					...prevState,
					loading: uploadOnDrop
						? LoadingState.LOADING
						: prevState.loading,
				};
			});

			//console.log("uploadingFile", uploadingFile);
			const { status, error } = await sendAsync({
				method: httpMethod,
				url: uploadUrl,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					console.log("progressEvent", progressEvent);
					const completed = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setState((prevState) => ({
						...prevState,
						progress: completed,
					}));
				},
			});

			if (status.success) {
				setState((prevState) => {
					// 複製 uploading 陣列
					const uploading = Array.from(prevState.uploading);

					// 將 uploading 內的第一個元素移除
					const [removed] = uploading.splice(0, 1);

					// 複製 uploaded 陣列
					const uploaded = Array.from(prevState.uploaded);

					//將 uploading 第一個檔案附加到 uploaded 最後
					uploaded.splice(uploaded.length, 0, removed);

					const hasNext = uploading.length > 0;
					// 若尚有待傳, 則自動開始傳 uploading 目前排名第一的檔案
					if (hasNext) handleUpload(uploading[0]);

					return {
						...prevState,
						uploading,
						uploaded,
						current: uploading[0],
						progress: hasNext ? 0 : 100,
						loading: hasNext
							? LoadingState.LOADING
							: LoadingState.DONE,
					};
				});
				console.log("upload done");

				if (onUploaded) {
					onUploaded(uploadingFile);
				}
			} else {
				console.error(error, "upload failed");
				setState((prev) => ({
					...prev,
					loading: LoadingState.FAILED,
				}));
				if (onUploadError) {
					onUploadError(error);
				}
			}
		},
		[
			uploadOnDrop,
			sendAsync,
			httpMethod,
			uploadUrl,
			onUploaded,
			onUploadError,
		]
	);

	const handleUploadAll = useCallback(
		async (uploadingFiles) => {
			// console.log(`building FormData for [${uploadingFile.name}]...`);
			console.log("handleUploadAll", uploadingFiles);
			const success = [];
			for (let i = 0; i < uploadingFiles.length; i++) {
				const uploadingFile = uploadingFiles[i];
				let formData = new FormData();
				formData.append("file", uploadingFile, uploadingFile.name);

				setState((prevState) => {
					return {
						...prevState,
						loading: uploadOnDrop
							? LoadingState.LOADING
							: prevState.loading,
					};
				});

				const { status, error } = await sendAsync({
					method: httpMethod,
					url: uploadUrl,
					data: formData,
					headers: {
						"Content-Type": "multipart/form-data",
					},
					onUploadProgress: (progressEvent) => {
						console.log("progressEvent", progressEvent);
						const completed = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setState((prevState) => ({
							...prevState,
							progress: completed,
						}));
					},
				});

				if (status.success) {
					success.push(uploadingFile);
					setState((prevState) => {
						// 複製 uploading 陣列
						const uploading = Array.from(prevState.uploading);

						// 將 uploading 內的第一個元素移除
						const [removed] = uploading.splice(0, 1);

						// 複製 uploaded 陣列
						const uploaded = Array.from(prevState.uploaded);

						//將 uploading 第一個檔案附加到 uploaded 最後
						uploaded.splice(uploaded.length, 0, removed);

						// const hasNext = uploading.length > 0;
						// 若尚有待傳, 則自動開始傳 uploading 目前排名第一的檔案
						// if (hasNext) handleUpload(uploading[0]);

						const hasNext = i < uploadingFiles.length - 1;

						return {
							...prevState,
							uploading,
							uploaded,
							// current: uploading[0],
							current: uploadingFile,
							progress: hasNext ? 0 : 100,
							// loading: hasNext
							// 	? LoadingState.LOADING
							// 	: LoadingState.DONE,
						};
					});
					console.log("upload done");

					if (onUploaded) {
						onUploaded(uploadingFile);
					}
					if (onAllUploaded) {
						onAllUploaded(success);
					}
				} else {
					handleUploadError(uploadingFile);
				}
			}
			console.log("success", success);
			setState((prev) => ({
				...prev,
				loading: LoadingState.DONE,
			}));
		},
		[
			onAllUploaded,
			sendAsync,
			httpMethod,
			uploadUrl,
			uploadOnDrop,
			onUploaded,
		]
	);

	const handleDropAccepted = useCallback(
		async (acceptedFiles, e) => {
			console.log("handleDropAccepted", acceptedFiles);
			//TODO: 檢查是否已有重複檔名

			if (acceptedFiles && acceptedFiles.length > 0) {
				try {
					if (validateFiles) {
						validateFiles(acceptedFiles);
					}
					//驗證通過
					setState((prevState) => {
						return {
							...prevState,
							uploading: acceptedFiles,
						};
					});
					// await handleUpload(acceptedFiles[0]);
					// console.log("state.uploaded", state.uploaded);
					handleUploadAll(acceptedFiles);
				} catch (err) {
					console.error(err, "handleDropAccepted err");
					if (onUploadError) onUploadError(err);
				}
			}
		},
		[handleUploadAll, onUploadError, validateFiles]
	);

	const handleDropRejected = useCallback(
		(rejectedFiles, e) => {
			console.log(`drop rejected:`);
			console.log(rejectedFiles);
			if (onDropRejected) onDropRejected();
		},
		[onDropRejected]
	);

	const {
		isDragActive,
		isDragAccept,
		isDragReject,
		getRootProps,
		getInputProps,
	} = useDropzone({
		// onDrop: handleDrop,
		onDropAccepted: handleDropAccepted,
		onDropRejected: handleDropRejected,
		accept: accept,
		...rest,
	});

	return (
		<Box sx={{ width: "100%", boxSizing: "border-box" }}>
			{/* 上傳成功區 */}
			{children}
			{/* 上傳進度 */}
			{state.loading === LoadingState.LOADING && (
				<FileProgress
					files={state.uploading}
					progress={state.progress}
				/>
			)}
			{/* 投放區 */}
			{state.loading !== LoadingState.LOADING && (
				<FileDropzoneBox
					readOnly={readOnly}
					{...getRootProps()}
					isDragAccept={isDragAccept}
					isDragReject={isDragReject}>
					<input {...getInputProps()} />
					<PromptBox>
						<CloudUploadIcon
							sx={{
								height: "51px",
								width: "51px",
								// color: disabled ? "rgb(162, 162, 162)" : "#000",
								color: "rgb(162, 162, 162)",
							}}
						/>
						<PromptTypography>
							{isDragActive
								? isDragAccept
									? dragActivePrompt
									: dragRejectPrompt
								: !disabled
								? dropPrompt
								: disabledPrompt}
						</PromptTypography>
					</PromptBox>
				</FileDropzoneBox>
			)}
		</Box>
	);
};

export default React.memo(FileDropzone);
