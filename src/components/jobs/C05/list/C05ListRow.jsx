import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C05DateColumn from "./columns/C05DateColumn";
import C05DeptColumn from "./columns/C05DeptColumn";
import C05IdColumn from "./columns/C05IdColumn";
import C05UserColumn from "./columns/C05UserColumn";

const C05ListRow = memo((props) => {
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
						<C05IdColumn>
							{value?.退貨單號}
						</C05IdColumn>
						<C05DateColumn>
							{value?.退貨日}
						</C05DateColumn>
						<C05UserColumn>
							{value?.倉管人員}
						</C05UserColumn>
						<C05DeptColumn>
							{value?.["廠商代碼+名稱"]}
						</C05DeptColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C05ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C05ListRow.displayName = "C05ListRow";
export default C05ListRow;
