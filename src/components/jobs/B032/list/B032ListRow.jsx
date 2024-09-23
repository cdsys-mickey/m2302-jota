import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B032IdColumn from "./columns/B032IdColumn";
import B032DateColumn from "./columns/B032DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import B032SupplierColumn from "./columns/B032SupplierColumn";
import B032UserColumn from "./columns/B032UserColumn";
import B032CustomerColumn from "./columns/B032CustomerColumn";
import { useMemo } from "react";
import B032ProdColumn from "./columns/B032ProdColumn";
import B032PriceColumn from "./columns/B032PriceColumn";

const B032ListRow = memo((props) => {
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
						<B032ProdColumn loading={loading}>
							{prod}
						</B032ProdColumn>
						<B032CustomerColumn loading={loading}>
							{customer}
						</B032CustomerColumn>

						<B032PriceColumn loading={loading}>
							{value?.Price}
						</B032PriceColumn>
						<B032PriceColumn loading={loading}>
							{value?.QPrice}
						</B032PriceColumn>
						<B032DateColumn loading={loading} onClick={handleSelectDate}>
							{value?.QDate}
						</B032DateColumn>
						<B032UserColumn loading={loading}>
							{employee}
						</B032UserColumn>
						{/* <B032ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B032ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B032ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B032ListRow.displayName = "B032ListRow";
export default B032ListRow;



