import { Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";

const defaultRender = ({ startIndex, endIndex, totalElements, loading, mobile = false }) => {
	let recordsPart = "";
	let totalPart = "";
	if (loading || !totalElements) {
		return "";
	}
	if (!mobile && startIndex !== undefined) {
		recordsPart = `第 ${startIndex + 1} ~ ${endIndex + 1} 筆`;
	}
	if (totalElements && totalElements > 0) {
		totalPart += `${recordsPart ? ", " : ""}`;
		if (mobile) {
			totalPart += `共${totalElements}筆`;
		} else {
			totalPart += `共 ${totalElements} 筆`;

		}
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

		const { mobile } = useContext(ResponsiveContext);

		return (
			<Typography
				ref={ref}
				variant="body2"
				sx={{
					display: "flex",
					alignItems: "center",
				}}
				{...rest}>
				{render({ startIndex, endIndex, totalElements, loading, mobile })}
			</Typography>
		);
	})
);
FetchResultLabel.displayName = "FetchResultLabel"
FetchResultLabel.propTypes = {
	startIndex: PropTypes.number,
	endIndex: PropTypes.number,
	totalElements: PropTypes.number,
	mobile: PropTypes.bool,
	loading: PropTypes.bool,
	render: PropTypes.func
}
export default FetchResultLabel;
