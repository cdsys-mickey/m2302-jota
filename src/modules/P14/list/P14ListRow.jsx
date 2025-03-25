import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P14IdColumn from "./columns/P14IdColumn";
import P14DateColumn from "./columns/P14DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import P14SupplierColumn from "./columns/P14SupplierColumn";
import P14UserColumn from "./columns/P14UserColumn";

const P14ListRow = memo((props) => {
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
						<P14IdColumn loading={loading}>
							{value?.PhyID}
						</P14IdColumn>
						<P14SupplierColumn loading={loading}>
							{value?.PhyData}
						</P14SupplierColumn>
						<P14UserColumn loading={loading}>
							{value?.製單人員}
						</P14UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

P14ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

P14ListRow.displayName = "P14ListRow";
export default P14ListRow;


