import { Typography } from "@mui/material";
import React from "react";

const renderMessage = (total, filtered, loading) => {
	if (loading || total === 0) {
		return "";
	}
	if (total > 0) {
		return `共 ${filtered < total ? filtered + " / " : ""}${total} 筆`;
	}
};

const FilteredFetchResultLabel = ({ total, filtered, loading, ...rest }) => {
	return (
		<Typography
			variant="body2"
			sx={{
				display: "flex",
				alignItems: "center",
			}}
			{...rest}>
			{renderMessage(total, filtered, loading)}
		</Typography>
	);
};

export default React.memo(FilteredFetchResultLabel);
