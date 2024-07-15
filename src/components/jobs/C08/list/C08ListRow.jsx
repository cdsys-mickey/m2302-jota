import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C08DateColumn from "./columns/C08DateColumn";
import C08DeptColumn from "./columns/C08DeptColumn";
import C08IdColumn from "./columns/C08IdColumn";
import C08UserColumn from "./columns/C08UserColumn";
import C08DeptIdColumn from "./columns/C08DeptIdColumn";
import C08DeptNameColumn from "./columns/C08DeptNameColumn";

const C08ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

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
						<C08IdColumn loading={loading}>
							{value?.撥出單號}
						</C08IdColumn>
						<C08DateColumn loading={loading}>
							{value?.撥出日}
						</C08DateColumn>
						<C08DeptIdColumn loading={loading}>
							{value?.撥出門市}
						</C08DeptIdColumn>
						<C08IdColumn loading={loading}>
							{value?.撥入單號}
						</C08IdColumn>
						<C08DeptIdColumn loading={loading}>
							{value?.撥入門市}
						</C08DeptIdColumn>
						<C08DeptNameColumn loading={loading}>
							{value?.撥入門市名稱}
						</C08DeptNameColumn>
						<C08IdColumn loading={loading}>
							{value?.訂貨單號}
						</C08IdColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C08ListRow.propTypes = {
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

C08ListRow.displayName = "C08ListRow";
export default C08ListRow;
