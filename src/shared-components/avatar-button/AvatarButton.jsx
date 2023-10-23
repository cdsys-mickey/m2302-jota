import { Avatar, IconButton, Tooltip } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

const AvatarButton = memo(
	forwardRef((props, ref) => {
		const {
			name,
			fullName,
			Menu,
			anchorEl,
			handleClick,
			handleMenuClose,
			...rest
		} = props;
		return (
			<>
				<Tooltip title={fullName}>
					<IconButton ref={ref} onClick={handleClick}>
						<Avatar sx={{ width: 32, height: 32 }}>{name}</Avatar>
					</IconButton>
				</Tooltip>
				{Menu && (
					<Menu
						open={!!anchorEl}
						anchorEl={anchorEl}
						onClose={handleMenuClose}
					/>
				)}
			</>
		);
	})
);

AvatarButton.propTypes = {
	Menu: PropTypes.object,
	anchorEl: PropTypes.object,
	handleClick: PropTypes.func,
	handleMenuClose: PropTypes.func,
};
export default AvatarButton;
