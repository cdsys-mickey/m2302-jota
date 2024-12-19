import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import D05DateColumn from "./columns/D05DateColumn";
import D05IdColumn from "./columns/D05IdColumn";
import D05UserColumn from "./columns/D05UserColumn";

const D05ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

	const employeeName = useMemo(() => {
		return `${value?.倉管人員 || ""} ${value?.倉管人員姓名 || ""}`;
	}, [value?.倉管人員, value?.倉管人員姓名]);

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction></HoverableListItemSecondaryAction>
				<Box>
					<Grid
						container
						columns={24}
						sx={[
							{
								minHeight: "36px",
								alignItems: "center",
							},
						]}>
						<IndexColumn title={index}></IndexColumn>
						<D05IdColumn>
							{value?.報廢單號}
						</D05IdColumn>
						<D05DateColumn>
							{value?.報廢日期}
						</D05DateColumn>

						<D05UserColumn>
							{employeeName}
						</D05UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D05ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

D05ListRow.displayName = "D05ListRow";
export default D05ListRow;
