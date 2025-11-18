import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import ZA03IDColumn from "./columns/ZA03IDColumn";
import ZA03NameColumn from "./columns/ZA03NameColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ZA03ClassColumn from "./columns/ZA03ClassColumn";
import ZA03DeptColumn from "./columns/ZA03DeptColumny";
import AuthScopeChip from "@/components/AuthScopeChip";
import LockIcon from '@mui/icons-material/Lock';

const ZA03ListRow = memo((props) => {
	const {
		index,
		style,
		value,
		loading,
		onClick,
		confirmResetPword,
		promptCopyAuth,
		showAuthScope
	} = props;

	const _inactive = useMemo(() => {
		return value?.PwordErrCount >= 3;
	}, [value?.PwordErrCount])

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
					{/* <Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip> */}
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
						<IndexColumn title={index}>
							{_inactive && (
								<LockIcon fontSize="small" />
							)}
						</IndexColumn>
						<ZA03IDColumn>
							{value?.LoginName}
						</ZA03IDColumn>
						<ZA03NameColumn>
							{value?.UserName}
						</ZA03NameColumn>
						<ZA03DeptColumn>
							{value?.AbbrName}
						</ZA03DeptColumn>
						{showAuthScope && (
							<ZA03ClassColumn>
								{value?.Class && <AuthScopeChip scope={value?.Class} size="small" />}
							</ZA03ClassColumn>
						)}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

ZA03ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

ZA03ListRow.displayName = "ZA03ListRow";
export default ZA03ListRow;
