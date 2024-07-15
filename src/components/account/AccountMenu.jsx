import LogoutIcon from "@mui/icons-material/Logout";
import RepeatIcon from "@mui/icons-material/Repeat";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useCallback } from "react";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { DeptSwitchMenuItemContainer } from "./menu-items/DeptSwitchMenuItemContainer";
import { GotoKitchenMenuItemContainer } from "./menu-items/GotoKitchecnMenuItemContainer";

const AccountMenu = memo(
	forwardRef(
		(
			{
				open,
				anchorEl,
				headerColor,
				onClose,
				onSignOut,
				gotoSettings,
				gotoKitchen,
				...rest
			},
			ref
		) => {
			const handleSignOut = useCallback(() => {
				onClose();
				onSignOut();
			}, [onClose, onSignOut]);

			return (
				<Menu
					ref={ref}
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={onClose}
					// onClick={onClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&:before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								// bgcolor: "background.paper",
								bgcolor: headerColor,
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
							"& .MuiList-root": {
								paddingTop: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
					{/* 切換門市 */}
					<DeptSwitchMenuItemContainer onMenuClose={onClose} />
					<MenuItem
						onClick={gotoSettings}
						sx={[
							(theme) => ({
								marginBottom: theme.spacing(1),
							}),
						]}>
						<ListItemIcon>
							<SettingsIcon fontSize="small" />
						</ListItemIcon>
						個人設定
					</MenuItem>
					<Divider />

					<MenuItem onClick={handleSignOut}>
						<ListItemIcon>
							<LogoutIcon fontSize="small" />
						</ListItemIcon>
						登出
					</MenuItem>
					{/*  */}
					<GotoKitchenMenuItemContainer>
						元件測試
					</GotoKitchenMenuItemContainer>
				</Menu>
			);
		}
	)
);
AccountMenu.propTypes = {
	onSignOut: PropTypes.func,
	onClose: PropTypes.func,
	toSettings: PropTypes.func,
};
export default AccountMenu;
