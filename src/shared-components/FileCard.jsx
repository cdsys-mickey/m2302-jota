import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Tooltip,
} from "@mui/material";

import { Draggable } from "react-beautiful-dnd";

// MUI Icons
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import clsx from "clsx";
import ConfirmationDialog from "./dialog/ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
	filUploadedCardDnD: {
		marginBottom: theme.spacing(1),
		padding: 0,
		// cursor: "pointer",
		backgroundColor: "rgba(0,0,0, 0.1)",
		"& .buttons": {
			// visibility: "hidden",
			opacity: 0,
			transition: theme.transitions.create("opacity", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		"&:hover": {
			"& .buttons": {
				// visibility: "visible",
				opacity: 1,
				transition: theme.transitions.create("opacity", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
		"& .drag-handle": {
			// visibility: "hidden",
			opacity: 0,
			transition: theme.transitions.create("opacity", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		"&:hover .drag-handle": {
			// visibility: "visible",
			opacity: 1,
			transition: theme.transitions.create("opacity", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
	},
	avatar: {
		marginLeft: theme.spacing(1),
	},
	dragHandle: {
		marginTop: "8px",
		alignItems: "flex-start",
		display: "flex",
		color: "rgba(0, 0, 0, 0.25)",
		position: "absolute",
		zIndex: theme.zIndex.drawer + 1,
	},
}));

const FileCard = ({
	className,
	file,
	index,
	handleView,
	handleDownload,
	handleRemove,
	readonly = false,
}) => {
	const classes = useStyles();
	const [state, setState] = useState({
		confirmRemove: false,
	});

	const handleCancel = () => {
		setState((prevState) => {
			return {
				...prevState,
				confirmRemove: false,
			};
		});
	};

	const key = file.id ? file.id : file.relativePath;

	return (
		<Draggable draggableId={key} index={index} key={key}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Paper
						className={clsx(classes.filUploadedCardDnD, className)}>
						{!readonly && (
							<div
								{...provided.dragHandleProps}
								className={clsx(
									classes.dragHandle,
									"drag-handle"
								)}>
								<Tooltip title="拖放以調整順序">
									<DragIndicatorIcon />
								</Tooltip>
							</div>
						)}

						<ListItem>
							<ListItemAvatar className={classes.avatar}>
								<Avatar>
									<AttachFileIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={file.name} />
							<ListItemSecondaryAction className="buttons">
								<Tooltip title="開啟新視窗檢視">
									<IconButton
										edge="end"
										onClick={(e) => {
											if (handleView) {
												handleView(file);
											}
										}}
										size="large">
										<OpenInNewIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="下載">
									<IconButton
										edge="end"
										onClick={(e) => {
											if (handleDownload) {
												handleDownload(file);
											}
										}}
										size="large">
										<SaveAltIcon />
									</IconButton>
								</Tooltip>
								{!readonly && (
									<Tooltip title="刪除">
										<IconButton
											edge="end"
											onClick={(e) => {
												setState((prevState) => {
													return {
														...prevState,
														confirmRemove: true,
													};
												});
											}}
											size="large">
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								)}
							</ListItemSecondaryAction>
						</ListItem>
						{provided.placeholder}
					</Paper>
					<ConfirmationDialog
						title="移除附件檔案"
						open={state.confirmRemove}
						ButtonProps={{
							size: "small",
						}}
						message={`確定要移除附件檔案${file?.name}?`}
						// onClose={handleCancel}
						onConfirm={() => {
							if (handleRemove) {
								handleRemove(file);
								handleCancel();
							}
						}}
						onCancel={handleCancel}
						onClose={handleCancel}
					/>
				</div>
			)}
		</Draggable>
	);
};

export default FileCard;
