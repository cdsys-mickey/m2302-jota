import { Avatar, IconButton, Tooltip } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StateBadge from "../state-badge/StateBadge";

const AvatarButton = memo((props) => {
	const {
		state,
		name,
		fullName,
		children,
		anchorEl,
		handleClick,
		handleMenuClose,
		MenuComponent,
		...rest
	} = props;
	// const renderMenu = children;
	return (
		<>
			<Tooltip title={fullName}>
				<IconButton onClick={handleClick}>
					<StateBadge
						state={state}
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant="dot">
						<Avatar sx={{ width: 32, height: 32 }}>{name}</Avatar>
					</StateBadge>
				</IconButton>
			</Tooltip>
			{/* {renderMenu
				? renderMenu({
						open: !!anchorEl,
						anchorEl,
						onClose: handleMenuClose,
				  })
				: null} */}
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
