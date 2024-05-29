import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C07DateColumn from "./columns/C07DateColumn";
import C07DeptIdColumn from "./columns/C07DeptIdColumn";
import C07DeptNameColumn from "./columns/C07DeptNameColumn";
import C07FlagColumn from "./columns/C07FlagColumn";
import C07IdColumn from "./columns/C07IdColumn";
import C07UserColumn from "./columns/C07UserColumn";

const C07ListRow = memo((props) => {
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
						<C07FlagColumn loading={loading}>
							{value?.結}
						</C07FlagColumn>
						<C07IdColumn loading={loading}>
							{value?.訂貨單號}
						</C07IdColumn>
						<C07DateColumn loading={loading}>
							{value?.訂貨日}
						</C07DateColumn>
						<C07DateColumn loading={loading}>
							{value?.預到日}
						</C07DateColumn>
						<C07UserColumn loading={loading}>
							{value?.製單人員}
						</C07UserColumn>
						<C07DeptIdColumn loading={loading}>
							{value?.訂貨門市}
						</C07DeptIdColumn>
						<C07DeptIdColumn loading={loading}>
							{value?.出貨門市}
						</C07DeptIdColumn>
						<C07DeptNameColumn loading={loading}>
							{value?.出貨門市名稱}
						</C07DeptNameColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C07ListRow.propTypes = {
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

C07ListRow.displayName = "C07ListRow";
export default C07ListRow;
