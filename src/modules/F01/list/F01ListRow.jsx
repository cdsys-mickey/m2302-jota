import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import F01IdColumn from "./columns/F01IdColumn";
import F01DateColumn from "./columns/F01DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import F01SupplierColumn from "./columns/F01SupplierColumn";
import F01UserColumn from "./columns/F01UserColumn";

const F01ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
					{/* 
				<Tooltip arrow title="編輯">
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
						<F01IdColumn loading={loading}>
							{value?.PhyID}
						</F01IdColumn>
						<F01SupplierColumn loading={loading}>
							{value?.PhyData}
						</F01SupplierColumn>
						<F01UserColumn loading={loading}>
							{value?.製單人員}
						</F01UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

F01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

F01ListRow.displayName = "F01ListRow";
export default F01ListRow;

