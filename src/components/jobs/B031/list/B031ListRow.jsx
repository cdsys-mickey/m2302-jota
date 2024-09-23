import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B031IdColumn from "./columns/B031IdColumn";
import B031DateColumn from "./columns/B031DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import B031SupplierColumn from "./columns/B031SupplierColumn";
import B031UserColumn from "./columns/B031UserColumn";
import B031CustomerColumn from "./columns/B031CustomerColumn";
import { useMemo } from "react";
import B031ProdColumn from "./columns/B031ProdColumn";
import B031PriceColumn from "./columns/B031PriceColumn";

const B031ListRow = memo((props) => {
	const { index, style, value, loading, onClick, handleSelectDate } = props;

	const customer = useMemo(() => {
		const { CustID, CustData_N } = value || "";
		return [
			// CustID, 
			CustData_N].filter(Boolean).join(" ");
	}, [value])

	const prod = useMemo(() => {
		const { ProdID, ProdData_N, PackData_N } = value || "";
		return [
			// ProdID, 
			ProdData_N]
			.filter(Boolean).join(" ").concat(PackData_N ? `(${PackData_N})` : "");
	}, [value])

	const employee = useMemo(() => {
		const { QEmplID, EmplData_N } = value || "";
		return [
			EmplData_N
		].filter(Boolean).join(" ");
	}, [value])

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
						<B031CustomerColumn loading={loading}>
							{customer}
						</B031CustomerColumn>
						<B031ProdColumn loading={loading}>
							{prod}
						</B031ProdColumn>

						<B031PriceColumn loading={loading}>
							{value?.Price}
						</B031PriceColumn>
						<B031PriceColumn loading={loading}>
							{value?.QPrice}
						</B031PriceColumn>
						<B031DateColumn loading={loading} onClick={handleSelectDate}>
							{value?.QDate}
						</B031DateColumn>
						<B031UserColumn loading={loading}>
							{employee}
						</B031UserColumn>
						{/* <B031ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B031ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B031ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B031ListRow.displayName = "B031ListRow";
export default B031ListRow;


