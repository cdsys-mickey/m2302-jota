import { Typography } from "@mui/material";
import React from "react";
import { forwardRef } from "react";
import { memo } from "react";

const defaultRender = ({ startIndex, endIndex, totalElements, loading }) => {
	let recordsPart = "";
	let totalPart = "";
	if (loading || !totalElements) {
		return "";
	}
	if (startIndex !== undefined) {
		recordsPart = `第 ${startIndex + 1} ~ ${endIndex + 1} 筆`;
	}
	if (totalElements && totalElements > 0) {
		totalPart = `${recordsPart ? ", " : ""}共 ${totalElements} 筆`;
	}
	return recordsPart + totalPart;
};

const FetchResultLabel = memo(
	forwardRef((props, ref) => {
		const {
			startIndex,
			endIndex,
			totalElements,
			loading,
			render = defaultRender,
			...rest
		} = props;
		return (
			<Typography
				ref={ref}
				variant="body2"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
				{...rest}>
				{render({ startIndex, endIndex, totalElements, loading })}
			</Typography>
		);
	})
);

export default FetchResultLabel;
