import { Avatar, IconButton, Tooltip } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

const AvatarButton = memo((props) => {
	const {
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
					<Avatar sx={{ width: 32, height: 32 }}>{name}</Avatar>
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
