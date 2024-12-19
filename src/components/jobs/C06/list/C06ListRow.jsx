import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C06DateColumn from "./columns/C06DateColumn";
import C06DeptColumn from "./columns/C06DeptColumn";
import C06IdColumn from "./columns/C06IdColumn";
import C06UserColumn from "./columns/C06UserColumn";
import C06FlagColumn from "./columns/C06FlagColumn";
import C06DeptIdColumn from "./columns/C06DeptIdColumn";
import C06DeptNameColumn from "./columns/C06DeptNameColumn";

const C06ListRow = memo((props) => {
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
						<C06FlagColumn>
							{value?.結}
						</C06FlagColumn>
						<C06IdColumn>
							{value?.訂貨單號}
						</C06IdColumn>
						<C06DateColumn>
							{value?.訂貨日}
						</C06DateColumn>
						<C06DateColumn>
							{value?.預到日}
						</C06DateColumn>
						<C06UserColumn>
							{value?.製單人員}
						</C06UserColumn>
						<C06DeptIdColumn>
							{value?.訂貨門市}
						</C06DeptIdColumn>
						<C06DeptIdColumn>
							{value?.出貨門市}
						</C06DeptIdColumn>
						<C06DeptNameColumn>
							{value?.出貨門市名稱}
						</C06DeptNameColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C06ListRow.propTypes = {
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

C06ListRow.displayName = "C06ListRow";
export default C06ListRow;
