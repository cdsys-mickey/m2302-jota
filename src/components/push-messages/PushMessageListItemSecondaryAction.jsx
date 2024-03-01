import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, Tooltip } from "@mui/material";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { memo } from "react";

const PushMessageListItemSecondaryAction = memo(
	forwardRef((props, ref) => {
		const { onMarkAsRead, ...other } = props;
		return (
			<HoverableListItemSecondaryAction ref={ref} {...other}>
				{onMarkAsRead && (
					<Tooltip title="標示為已讀">
						<IconButton
							edge="end"
							aria-label="delete"
							// size="small"
							onClick={onMarkAsRead}>
							<CheckCircleIcon
								fontSize="medium"
								color="success"
							/>
						</IconButton>
					</Tooltip>
				)}
			</HoverableListItemSecondaryAction>
		);
	})
);

PushMessageListItemSecondaryAction.propTypes = {
	onMarkAsRead: PropTypes.func,
};
PushMessageListItemSecondaryAction.displayName =
	"PushMessageListItemSecondaryAction";
export default PushMessageListItemSecondaryAction;
