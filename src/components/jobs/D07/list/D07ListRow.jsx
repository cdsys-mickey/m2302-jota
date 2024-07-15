import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import D07DateColumn from "./columns/D07DateColumn";
import D07IdColumn from "./columns/D07IdColumn";
import D07DeptColumn from "./columns/D07DeptColumn";
import D07UserColumn from "./columns/D07UserColumn";
import D07FlagColumn from "./columns/D07OrderNameColumn";
import D07DeptIdColumn from "./columns/D07DeptIdColumn";
import D07DeptNameColumn from "./columns/D07DeptNameColumn";
import D07NumColumn from "./columns/D07NumColumn";
import { useMemo } from "react";
import D07OrderNameColumn from "./columns/D07OrderNameColumn";

const D07ListRow = memo((props) => {
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
						<D07IdColumn loading={loading}>
							{value?.試算單號 || ""}
						</D07IdColumn>
						<D07OrderNameColumn loading={loading}>
							{value?.單號名稱 || ""}
						</D07OrderNameColumn>
						<D07UserColumn loading={loading}>
							{employeeName}
						</D07UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D07ListRow.propTypes = {
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

D07ListRow.displayName = "D07ListRow";
export default D07ListRow;
