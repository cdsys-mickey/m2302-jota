import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import D02DateColumn from "./columns/D02DateColumn";
import D02IdColumn from "./columns/D02IdColumn";
import D02DeptColumn from "./columns/D02DeptColumn";
import D02UserColumn from "./columns/D02UserColumn";
import D02FlagColumn from "./columns/D02FlagColumn";
import D02DeptIdColumn from "./columns/D02DeptIdColumn";
import D02DeptNameColumn from "./columns/D02DeptNameColumn";
import D02NumColumn from "./columns/D02NumColumn";
import { useMemo } from "react";

const D02ListRow = memo((props) => {
	const { index, style, value, onClick, expChecking } = props;
	const pdline = useMemo(() => {
		return `${value?.線別} ${value?.退料線別名稱}`;
	}, [value?.線別, value?.退料線別名稱]);

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
						<D02IdColumn>
							{value?.退料單號}
						</D02IdColumn>
						<D02DateColumn>
							{value?.退料日期}
						</D02DateColumn>
						<D02UserColumn>
							{value?.製單人員}
						</D02UserColumn>
						<D02DeptColumn>
							{pdline}
						</D02DeptColumn>
						{expChecking && (
							<>
								<D02IdColumn>
									{value?.商品編號}
								</D02IdColumn>
								<D02NumColumn>
									{value?.數量}
								</D02NumColumn>
								<D02DateColumn>
									{value?.有效期限}
								</D02DateColumn>
							</>
						)}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D02ListRow.propTypes = {
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

D02ListRow.displayName = "D02ListRow";
export default D02ListRow;
