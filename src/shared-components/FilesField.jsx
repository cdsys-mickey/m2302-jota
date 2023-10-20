import { AlertTitle, List } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import RBDnD from "@/shared-modules/rb-dnd";
import AlertEx from "./AlertEx";
import DialogEx from "./dialog/DialogEx";
import FileDropzone from "./file-upload/FileDropzone";

const FilesField = ({
	readOnly,
	id,
	label,
	value,
	getKey,
	uploadUrl,
	ItemComponent,
	ItemComponentProps,
	// METHODS
	onChange,
	onFileOverwritten,
	getValue,
	getFileName = (v) => v,
	isEqual = (x, y) => x === y,
	onDelete,
	onUploadError,
	...rest
}) => {
	const [deleting, setDeleting] = useState();

	const getValueFromFile = useCallback(
		(f) => {
			if (getValue) {
				return getValue(f);
			}
			return f?.name;
		},
		[getValue]
	);

	const getFileNameFromValue = useCallback(
		(v) => {
			if (getFileName) {
				return getFileName(v);
			}
			return v;
		},
		[getFileName]
	);

	const handleDelete = useCallback(
		(v) => {
			if (onDelete) {
				onDelete(v);
				return;
			}
			console.debug("handleDelete", v);
		},
		[onDelete]
	);

	const isValueEqual = useCallback(
		(x, y) => {
			if (isEqual) {
				return isEqual(x, y);
			}
			return x === y;
		},
		[isEqual]
	);

	const handleFileOverwritten = useCallback(
		(f) => {
			if (onFileOverwritten) {
				onFileOverwritten(f);
				return;
			}
			console.warn(`${f.name} overritten`);
		},
		[onFileOverwritten]
	);

	// const handleDragEnd = useCallback(
	// 	(dragResult) => {
	// 		RBDnD.handleDragEnd(dragResult, value, onChange);
	// 	},
	// 	[onChange, value]
	// );

	const confirmDelete = useCallback((item) => {
		setDeleting(item);
		console.debug("deleting", item);
	}, []);

	const handleAllUploaded = useCallback(
		(files) => {
			console.debug("current value", value);
			console.debug("handleAllUploaded", files);

			onChange([
				...value,
				...files
					.filter((f) => {
						const data = getValueFromFile(f);
						const found = value.find((v) => isValueEqual(v, data));
						if (found) {
							console.warn(`${data} duplicated`);
							handleFileOverwritten(f);
							return false;
						}
						return true;
					})
					.map((f) => getValueFromFile(f)),
			]);
		},
		[getValueFromFile, handleFileOverwritten, isValueEqual, onChange, value]
	);

	if (!ItemComponent) {
		return (
			<Container maxWidth="xs">
				<Box>
					<AlertEx severity="warning">
						<AlertTitle>{`${label} 錯誤`}</AlertTitle>
						未定義 ItemComponent
					</AlertEx>
				</Box>
			</Container>
		);
	}

	// if (!getValueFromFile) {
	// 	return (
	// 		<Container maxWidth="xs">
	// 			<AlertEx severity="error" flex={1}>
	// 				<AlertTitle>{`${label} 錯誤`}</AlertTitle>
	// 				並未定義 getValueFromFile callback
	// 			</AlertEx>
	// 		</Container>
	// 	);
	// }

	return (
		<>
			<DialogEx
				title="移除檔案"
				open={!!deleting}
				buttonProps={{
					size: "small",
				}}
				message={
					deleting
						? `確定要刪除${label}「${getFileNameFromValue(
								deleting
						  )}」?`
						: ""
				}
				onCancel={() => setDeleting(null)}
				onClose={() => setDeleting(null)}
				onConfirm={() => {
					if (onChange) {
						onChange(
							value.filter((f) =>
								isEqual ? !isEqual(f, deleting) : f !== deleting
							)
						);
						handleDelete(deleting);
						setDeleting(null);
					}
				}}
			/>
			<DragDropContext
				// onDragEnd={handleDragEnd}
				onDragEnd={RBDnD.handleDragEnd(value, onChange)}>
				<Droppable droppableId={id}>
					{(provided, snapshot) => (
						<List
							sx={{
								paddingTop: 0,
								paddingBottom: 0,
							}}
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{value &&
								value?.map((t, index) => {
									const key = getKey ? getKey(t) : t;
									return (
										<Draggable
											key={key}
											draggableId={key}
											index={index}>
											{(provided, snapshot) => (
												<ItemComponent
													index={index}
													key={key}
													dragging={
														snapshot.isDragging
													}
													innerRef={provided.innerRef}
													draggableProps={
														provided.draggableProps
													}
													dragHandleProps={
														provided.dragHandleProps
													}
													data={t}
													onDelete={confirmDelete}
													{...ItemComponentProps}
												/>
											)}
										</Draggable>
									);
								})}
							{provided.placeholder}
						</List>
					)}
				</Droppable>
			</DragDropContext>
			<FileDropzone
				readOnly={readOnly}
				uploadUrl={uploadUrl}
				onUploadError={onUploadError}
				// onUploaded={(f) => handleUploaded(f)}
				onAllUploaded={handleAllUploaded}
				{...rest}
			/>
		</>
	);
};

export default React.memo(FilesField);
