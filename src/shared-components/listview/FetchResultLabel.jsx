import { Typography } from "@mui/material";
import React from "react";

const renderMessage = (totalElements, loading) => {
	if (loading || !totalElements) {
		return "";
	}
	if (totalElements && totalElements > 0) {
		return `共 ${totalElements} 筆`;
	}
};

const FetchResultLabel = ({
	totalElements,
	loading,
	render = renderMessage,
	...rest
}) => {
	return (
		<Typography
			variant="body2"
			sx={{
				display: "flex",
				alignItems: "center",
			}}
			{...rest}>
			{render(totalElements, loading)}
		</Typography>
	);
};

export default React.memo(FetchResultLabel);
