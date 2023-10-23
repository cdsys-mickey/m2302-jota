import LogoutIcon from "@mui/icons-material/Logout";
import RepeatIcon from "@mui/icons-material/Repeat";
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { forwardRef, memo } from "react";

const MockAccountMenu = memo(
	forwardRef(({ open, anchorEl, onClose, ...rest }, ref) => {
		return (
			<Menu
				ref={ref}
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={onClose}
				onClick={onClose}
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
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
				<MenuItem onClick={onClose}>總公司 王XX</MenuItem>
				<Divider />
				<MenuItem onClick={onClose}>
					<ListItemIcon>
						<RepeatIcon fontSize="small" />
					</ListItemIcon>
					切換體系
				</MenuItem>
				<MenuItem onClick={onClose}>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					個人設定
				</MenuItem>

				<MenuItem onClick={onClose}>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					登出
				</MenuItem>
			</Menu>
		);
	})
);

export default MockAccountMenu;
