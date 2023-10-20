import { Drawer } from "@mui/material";
import React, { memo } from "react";

export const DrawerEx = memo((props) => {
	const { sx = [], invert = false, ...rest } = props;
	return (
		<Drawer
			sx={[
				invert && {
					backgroundColor: "black",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}></Drawer>
	);
});

export const DrawerExContainer = (props) => {
	const { ...rest } = props;

	return <DrawerEx {...rest} />;
};

export default DrawerExContainer;
