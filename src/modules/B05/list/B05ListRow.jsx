import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B05DateColumn from "./columns/B05DateColumn";
import B05IdColumn from "./columns/B05IdColumn";
import B05SupplierColumn from "./columns/B05SupplierColumn";
import B05UserColumn from "./columns/B05UserColumn";

const B05ListRow = memo((props) => {
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
						<B05IdColumn>
							{value?.詢價單號}
						</B05IdColumn>
						<B05DateColumn>
							{value?.詢價日期}
						</B05DateColumn>
						<B05SupplierColumn>
							{value?.廠商名稱}
						</B05SupplierColumn>
						<B05UserColumn>
							{value?.詢價人員}
						</B05UserColumn>
						{/* <B05ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B05ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B05ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B05ListRow.displayName = "B05ListRow";
export default B05ListRow;
