import React, { useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ListViewHeaderButton = styled(({ children, ascending, ...rest }) => {
	const endIcon = useMemo(() => {
		if (ascending === undefined || ascending === null) {
			return false;
		}
		return ascending ? (
			<ArrowDropUpIcon fontSize="small" />
		) : (
			<ArrowDropDownIcon fontSize="small" />
		);
	}, [ascending]);

	return (
		<Button endIcon={endIcon} {...rest}>
			<Typography variant="body2">{children}</Typography>
		</Button>
	);
})(({ theme }) => ({
	color: "#fff",
	backgroundColor: "transparent",
	// "&:hover": {
	// 	backgroundColor: purple[700],
	// },
	padding: 0,
	minWidth: 0,
}));

export default React.memo(ListViewHeaderButton);
