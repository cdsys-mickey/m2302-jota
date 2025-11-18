import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C02DateColumn from "./columns/C02DateColumn";
import C02IdColumn from "./columns/C02IdColumn";
import C02DeptColumn from "./columns/C02DeptColumn";
import C02UserColumn from "./columns/C02UserColumn";
import C02FlagColumn from "./columns/C02FlagColumn";

const C02ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
				</HoverableListItemSecondaryAction>
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
						<C02IdColumn>
							{value?.請購單號}
						</C02IdColumn>
						<C02FlagColumn>
							{value?.核}
						</C02FlagColumn>
						<C02FlagColumn>
							{value?.採}
						</C02FlagColumn>
						<C02DateColumn>
							{value?.請購日}
						</C02DateColumn>
						<C02DeptColumn>
							{value?.申請部門}
						</C02DeptColumn>
						<C02UserColumn>
							{value?.製單人員}
						</C02UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C02ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C02ListRow.displayName = "C02ListRow";
export default C02ListRow;
