import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B04IdColumn from "./columns/B04IdColumn";
import B04DateColumn from "./columns/B04DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import B04SupplierColumn from "./columns/B04SupplierColumn";
import B04UserColumn from "./columns/B04UserColumn";
import B04CustomerColumn from "./columns/B04CustomerColumn";
import { useMemo } from "react";
import B04ProdColumn from "./columns/B04ProdColumn";
import B04PriceColumn from "./columns/B04PriceColumn";

const B04ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;

	const cust = useMemo(() => {
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
	}, [])

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
						<B04CustomerColumn loading={loading}>
							{cust}
						</B04CustomerColumn>
						<B04ProdColumn loading={loading}>
							{prod}
						</B04ProdColumn>
						<B04DateColumn loading={loading}>
							{value?.QDate}
						</B04DateColumn>
						<B04PriceColumn loading={loading}>
							{value?.Price}
						</B04PriceColumn>
						<B04PriceColumn loading={loading}>
							{value?.QPrice}
						</B04PriceColumn>
						<B04UserColumn loading={loading}>
							{employee}
						</B04UserColumn>
						{/* <B04ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B04ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B04ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B04ListRow.displayName = "B04ListRow";
export default B04ListRow;



