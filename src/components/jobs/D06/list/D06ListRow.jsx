import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import D06DateColumn from "./columns/D06DateColumn";
import D06DeptColumn from "./columns/D06DeptColumn";
import D06IdColumn from "./columns/D06IdColumn";
import D06UserColumn from "./columns/D06UserColumn";

const D06ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const pdline = useMemo(() => {
		return `${value?.線別} ${value?.生產線別名稱}`;
	}, [value?.線別, value?.生產線別名稱]);

	const employeeName = useMemo(() => {
		return `${value?.製單人員 || ""} ${value?.製單人員姓名 || ""}`;
	}, [value?.製單人員, value?.製單人員姓名]);

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
					{/* <Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip> 
					<Tooltip arrow title="複製權限" sx={{ zIndex: 10000 }}>
						<IconButton onClick={promptCopyAuth}>
							<ContentCopyIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
					<Tooltip arrow title="重設密碼" sx={{ zIndex: 10000 }}>
						<IconButton onClick={confirmResetPword}>
							<LockResetIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
					*/}
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
						<D06IdColumn>
							{value?.結餘單號}
						</D06IdColumn>
						<D06DateColumn>
							{value?.結餘日期}
						</D06DateColumn>
						<D06UserColumn>
							{employeeName}
						</D06UserColumn>
						<D06DeptColumn>
							{pdline}
						</D06DeptColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D06ListRow.propTypes = {
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

D06ListRow.displayName = "D06ListRow";
export default D06ListRow;
