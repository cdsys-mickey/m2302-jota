import { Divider, ListItemButton } from "@mui/material";
import React from "react";
import HoverableListItem from "@/shared-components/HoverableListItem";
import MessageItemChipCell from "./MessageItemChip";
import MessageItemText from "./MessageItemText";
import MessageItemSecondaryAction from "./MessageItemSecondaryAction";
import ChipEx from "@/shared-components/ChipEx";

const PushMessageItem = React.forwardRef((props, ref) => {
	const { children, job, primary, secondary, onClick, onJobClick, ...rest } =
		props;
	return (
		<HoverableListItem ref={ref} {...rest}>
			<ListItemButton onClick={onClick}>
				<MessageItemChipCell onClick={onJobClick}>
					{job && <ChipEx label={job} size="small" color="primary" />}
				</MessageItemChipCell>
				<MessageItemText primary={primary} secondary={secondary} />
			</ListItemButton>
			<MessageItemSecondaryAction />
			<Divider variant="middle" />
		</HoverableListItem>
	);
});

export default React.memo(PushMessageItem);
