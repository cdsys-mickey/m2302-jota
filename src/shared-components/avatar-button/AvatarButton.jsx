import { Avatar, IconButton, Tooltip } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import ConnStateBadge from "../state-badge/ConnStateBadge";

const AvatarButton = memo((props) => {
	const {
		color,
		state,
		label,
		title,
		children,
		anchorEl,
		handleClick,
		handleMenuClose,
		MenuComponent,
		...rest
	} = props;

	return (
		<>
			<Tooltip title={title}>
				<IconButton onClick={handleClick}>
					<ConnStateBadge
						state={state}
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant="dot">
						<Avatar
							sx={[
								(theme) => ({
									width: 32,
									height: 32,
									bgcolor: color,
									color: theme.palette.getContrastText(color),
								}),
							]}>
							{label}
						</Avatar>
					</ConnStateBadge>
				</IconButton>
			</Tooltip>
			{MenuComponent && (
				<MenuComponent
					open={!!anchorEl}
					anchorEl={anchorEl}
					onClose={handleMenuClose}
				/>
			)}
		</>
	);
});
AvatarButton.displayName = "AvatarButton";
AvatarButton.propTypes = {
	Menu: PropTypes.object,
	anchorEl: PropTypes.object,
	handleClick: PropTypes.func,
	handleMenuClose: PropTypes.func,
	MenuComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
};
export default AvatarButton;
