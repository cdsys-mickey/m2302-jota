import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C08DateColumn from "./columns/C08DateColumn";
import C08DeptIdColumn from "./columns/C08DeptIdColumn";
import C08DeptNameColumn from "./columns/C08DeptNameColumn";
import C08IdColumn from "./columns/C08IdColumn";

const C08ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

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
						<C08IdColumn>
							{value?.撥出單號}
						</C08IdColumn>
						<C08DateColumn>
							{value?.撥出日}
						</C08DateColumn>
						<C08DeptIdColumn>
							{value?.撥出門市}
						</C08DeptIdColumn>
						<C08IdColumn>
							{value?.撥入單號}
						</C08IdColumn>
						<C08DeptNameColumn>
							{value?.撥入門市}
							{value?.撥入門市名稱}
						</C08DeptNameColumn>
						<C08IdColumn>
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
	promptCopyAuth: PropTypes.func,
};

C08ListRow.displayName = "C08ListRow";
export default C08ListRow;
