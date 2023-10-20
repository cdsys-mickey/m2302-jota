import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import FlexBox from "./FlexBox";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HoverableListItemSecondaryAction from "./HoverableListItemSecondaryAction";
import HoverableListItem from "./HoverableListItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";

const FileListItem = ({
	innerRef,
	draggableProps,
	dragHandleProps,
	onClick,
	data,
	dragging,
	// METHODS
	getName,
	onDelete,
	...rest
}) => {
	return (
		<div ref={innerRef}>
			<HoverableListItem
				p={0.5}
				{...draggableProps}
				onClick={onClick}
				sx={[
					{
						mb: 1,
						backgroundColor: dragging ? grey[200] : grey[100],
					},
					dragging && {
						boxShadow: "1px 2px 8px rgb(0 0 0 / 40%)",
					},
				]}
				{...rest}>
				<FlexBox inline alignItems="center">
					<Tooltip arrow title="按住拖放即可對檔案進行排序">
						<FlexBox
							{...dragHandleProps}
							alignItems="center"
							className="secondary-action">
							<DragIndicatorIcon color="action" />
						</FlexBox>
					</Tooltip>

					<ListItemIcon sx={{ minWidth: 0 }}>
						<AttachFileIcon color="action" />
					</ListItemIcon>
					<ListItemText primary={getName ? getName(data) : data} />
				</FlexBox>
				<HoverableListItemSecondaryAction top={0.5} right={2}>
					{onDelete && (
						<Tooltip title="刪除">
							<IconButton
								edge="end"
								color="inherit"
								size="small"
								onClick={() => onDelete(data)}>
								<DeleteOutlineIcon />
							</IconButton>
						</Tooltip>
					)}
				</HoverableListItemSecondaryAction>
			</HoverableListItem>
		</div>
	);
};

export default React.memo(FileListItem);
