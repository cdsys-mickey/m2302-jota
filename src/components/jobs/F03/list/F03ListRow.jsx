import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import F03IdColumn from "./columns/F03IdColumn";
import F03OrderNameColumn from "./columns/F03OrderNameColumn";
import F03UserColumn from "./columns/F03UserColumn";

const F03ListRow = memo((props) => {
	const { index, style, value, loading, onClick, expChecking } = props;
	const employeeName = useMemo(() => {
		return `${value?.編輯人員 || ""} ${value?.編輯人員名稱 || ""}`;
	}, [value?.編輯人員, value?.編輯人員名稱]);

	// const sheet = useMemo(() => {
	// 	return `${value?.試算單號 || ""} ${value?.單號名稱 || ""}`;
	// }, [value?.單號名稱, value?.試算單號]);

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
						<F03IdColumn loading={loading}>
							{value?.PhyID || ""}
						</F03IdColumn>
						<F03OrderNameColumn loading={loading}>
							{value?.PhyData || ""}
						</F03OrderNameColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

F03ListRow.propTypes = {
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

F03ListRow.displayName = "F03ListRow";
export default F03ListRow;

