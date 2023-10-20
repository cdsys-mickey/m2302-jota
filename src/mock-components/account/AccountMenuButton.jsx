import { Avatar, IconButton, Tooltip } from "@mui/material";
import { forwardRef, memo } from "react";
import MockAccountMenu from "./MockAccountMenu";

const AccountMenuButton = memo(
	forwardRef((props, ref) => {
		const {
			accountAnchorEl,
			handleAccountClick,
			handleAccountMenuClose,
			...rest
		} = props;
		return (
			<>
				<Tooltip title="王XX">
					<IconButton onClick={handleAccountClick}>
						<Avatar sx={{ width: 32, height: 32 }}>王</Avatar>
					</IconButton>
				</Tooltip>
				<MockAccountMenu
					open={!!accountAnchorEl}
					anchorEl={accountAnchorEl}
					onClose={handleAccountMenuClose}
				/>
			</>
		);
	})
);

export default AccountMenuButton;
