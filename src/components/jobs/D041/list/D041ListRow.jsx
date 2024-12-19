import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import D041DateColumn from "./columns/D041DateColumn";
import D041IdColumn from "./columns/D041IdColumn";
import D041DeptColumn from "./columns/D041DeptColumn";
import D041UserColumn from "./columns/D041UserColumn";
import D041FlagColumn from "./columns/D041FlagColumn";
import D041DeptIdColumn from "./columns/D041DeptIdColumn";
import D041DeptNameColumn from "./columns/D041DeptNameColumn";
import D041NumColumn from "./columns/D041NumColumn";
import { useMemo } from "react";

const D041ListRow = memo((props) => {
	const { index, style, value, onClick, expChecking } = props;

	const pdline = useMemo(() => {
		return `${value?.線別 || ""} ${value?.生產線別名稱 || ""}`;
	}, [value?.線別, value?.生產線別名稱]);

	const employeeName = useMemo(() => {
		return `${value?.倉管人員 || ""} ${value?.倉管人員姓名 || ""}`;
	}, [value?.倉管人員, value?.倉管人員姓名]);

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
						<D041IdColumn>
							{value?.入庫單號}
						</D041IdColumn>
						<D041DateColumn>
							{value?.入庫日期}
						</D041DateColumn>
						<D041UserColumn>
							{employeeName}
						</D041UserColumn>
						<D041DeptColumn>
							{pdline}
						</D041DeptColumn>
						{expChecking && (
							<>
								<D041IdColumn>
									{value?.貨品編號}
								</D041IdColumn>
								<D041NumColumn>
									{value?.數量}
								</D041NumColumn>
								<D041DateColumn>
									{value?.有效期限}
								</D041DateColumn>
							</>
						)}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

D041ListRow.propTypes = {
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

D041ListRow.displayName = "D041ListRow";
export default D041ListRow;
