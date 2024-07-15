import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import D01DateColumn from "./columns/D01DateColumn";
import D01IdColumn from "./columns/D01IdColumn";
import D01DeptColumn from "./columns/D01DeptColumn";
import D01UserColumn from "./columns/D01UserColumn";
import D01FlagColumn from "./columns/D01FlagColumn";
import D01DeptIdColumn from "./columns/D01DeptIdColumn";
import D01DeptNameColumn from "./columns/D01DeptNameColumn";
import D01NumColumn from "./columns/D01NumColumn";
import { useMemo } from "react";

const D01ListRow = memo((props) => {
	const { index, style, value, loading, onClick, expChecking } = props;
	const pdline = useMemo(() => {
		return `${value?.線別} ${value?.領料線別名稱}`;
	}, [value?.線別, value?.領料線別名稱]);

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
						<D01IdColumn loading={loading}>
							{value?.領料單號}
						</D01IdColumn>
						<D01DateColumn loading={loading}>
							{value?.領料日期}
						</D01DateColumn>
						<D01UserColumn loading={loading}>
							{value?.製單人員}
						</D01UserColumn>
						<D01DeptColumn loading={loading}>
							{pdline}
						</D01DeptColumn>
						{expChecking && (
							<>
								<D01IdColumn loading={loading}>
									{value?.商品編號}
								</D01IdColumn>
								<D01NumColumn loading={loading}>
									{value?.數量}
								</D01NumColumn>
								<D01DateColumn loading={loading}>
									{value?.有效期限}
								</D01DateColumn>
							</>
						)}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D01ListRow.propTypes = {
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

D01ListRow.displayName = "D01ListRow";
export default D01ListRow;
