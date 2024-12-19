import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C03DateColumn from "./columns/C03DateColumn";
import C03IdColumn from "./columns/C03IdColumn";
import C03DeptColumn from "./columns/C03DeptColumn";
import C03UserColumn from "./columns/C03UserColumn";
import C03FlagColumn from "./columns/C03FlagColumn";
import C03CheckerColumn from "./columns/C03CheckerColumn";

const C03ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

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
						<C03IdColumn>
							{value?.採購單號}
						</C03IdColumn>
						<C03FlagColumn>
							{value?.結}
						</C03FlagColumn>
						<C03FlagColumn>
							{value?.覆核人員 ? "*" : ""}
						</C03FlagColumn>
						<C03DateColumn>
							{value?.採購日}
						</C03DateColumn>
						<C03UserColumn>
							{value?.製單人員}
						</C03UserColumn>
						<C03DeptColumn>
							{value?.["廠商代碼+名稱"]}
						</C03DeptColumn>
						{/* <C03CheckerColumn>
							{value?.覆核人員}
						</C03CheckerColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C03ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C03ListRow.displayName = "C03ListRow";
export default C03ListRow;
