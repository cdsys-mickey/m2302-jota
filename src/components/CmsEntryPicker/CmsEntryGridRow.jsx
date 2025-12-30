import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { CmsEntryDateColumn } from "./columns/CmsEntryDateColumn";
import { CmsEntryDeptColumn } from "./columns/CmsEntryDeptColumn";
import { CmsEntryIdColumn } from "./columns/CmsEntryIdColumn";

const CmsEntryGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		return (
			<Grid ref={ref} container columns={24} spacing={1}>
				<CmsEntryIdColumn>{value["OrdID"]}</CmsEntryIdColumn>
				<CmsEntryDateColumn>{value["OrdDate"]}</CmsEntryDateColumn>
				<CmsEntryDateColumn>{value["ArrDate"]}</CmsEntryDateColumn>
				<CmsEntryDeptColumn>{value["GrpName"]}</CmsEntryDeptColumn>
				<CmsEntryDeptColumn>{value["CarData"]}</CmsEntryDeptColumn>
				<CmsEntryDeptColumn>{value["TrvData"]}</CmsEntryDeptColumn>
			</Grid>
		);
	})
);

CmsEntryGridRow.propTypes = {
	value: PropTypes.object,
};

CmsEntryGridRow.displayName = "DepOrderGridRow";
export default CmsEntryGridRow;