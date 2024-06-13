import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C09DateColumn from "./columns/C09DateColumn";
import C09DeptColumn from "./columns/C09DeptColumn";
import C09IdColumn from "./columns/C09IdColumn";
import C09UserColumn from "./columns/C09UserColumn";
import C09DeptIdColumn from "./columns/C09DeptIdColumn";
import C09DeptNameColumn from "./columns/C09DeptNameColumn";
import { useMemo } from "react";

const C09ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

	const txoDeptName = useMemo(() => {
		return `${value?.撥出門市} ${value?.撥出門市名稱}`;
	}, [value?.撥出門市, value?.撥出門市名稱]);

	const employeeName = useMemo(() => {
		return `${value?.驗收人員 || "(空白)"} ${
			value?.驗收人員姓名 || "(空白)"
		}`;
	}, [value?.驗收人員, value?.驗收人員姓名]);

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
						<C09IdColumn loading={loading}>
							{value?.撥入單號}
						</C09IdColumn>
						<C09DateColumn loading={loading}>
							{value?.撥入日期}
						</C09DateColumn>
						<C09IdColumn loading={loading}>
							{value?.撥出單號}
						</C09IdColumn>
						<C09DeptColumn loading={loading}>
							{txoDeptName}
						</C09DeptColumn>

						<C09UserColumn loading={loading}>
							{employeeName}
						</C09UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C09ListRow.propTypes = {
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

C09ListRow.displayName = "C09ListRow";
export default C09ListRow;
