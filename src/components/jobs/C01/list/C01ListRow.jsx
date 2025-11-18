import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C01DateColumn from "./columns/C01DateColumn";
import C01IdColumn from "./columns/C01IdColumn";
import C01DeptColumn from "./columns/C01DeptColumn";
import C01UserColumn from "./columns/C01UserColumn";
import C01FlagColumn from "./columns/C01FlagColumn";

const C01ListRow = memo((props) => {
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
						<C01IdColumn>
							{value?.請購單號}
						</C01IdColumn>
						<C01FlagColumn>
							{value?.核}
						</C01FlagColumn>
						<C01FlagColumn>
							{value?.採}
						</C01FlagColumn>
						<C01DateColumn>
							{value?.請購日}
						</C01DateColumn>
						<C01DeptColumn>
							{value?.申請部門}
						</C01DeptColumn>
						<C01UserColumn>
							{value?.製單人員}
						</C01UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C01ListRow.displayName = "C01ListRow";
export default C01ListRow;
