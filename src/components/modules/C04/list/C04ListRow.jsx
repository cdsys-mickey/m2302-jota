import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C04DateColumn from "./columns/C04DateColumn";
import C04IdColumn from "./columns/C04IdColumn";
import C04DeptColumn from "./columns/C04DeptColumn";
import C04UserColumn from "./columns/C04UserColumn";
import C04FlagColumn from "./columns/C04FlagColumn";

const C04ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

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
						<C04IdColumn loading={loading}>
							{value?.進貨單號}
						</C04IdColumn>
						<C04DateColumn loading={loading}>
							{value?.進貨日}
						</C04DateColumn>
						<C04UserColumn loading={loading}>
							{value?.倉管人員}
						</C04UserColumn>
						<C04DeptColumn loading={loading}>
							{value?.["廠商代碼+名稱"]}
						</C04DeptColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C04ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C04ListRow.displayName = "C04ListRow";
export default C04ListRow;
