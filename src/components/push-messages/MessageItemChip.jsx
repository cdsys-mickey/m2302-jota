import React from "react";

import { ListItemIcon, styled } from "@mui/material";

const MessageItemChipCell = styled(({ children, ...other }) => {
	return <ListItemIcon {...other}>{children}</ListItemIcon>;
})(({ theme }) => ({}));

export default React.memo(MessageItemChipCell);
