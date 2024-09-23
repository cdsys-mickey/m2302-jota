import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B012IdColumn from "./columns/B012IdColumn";
import B012DateColumn from "./columns/B012DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import B012SupplierColumn from "./columns/B012SupplierColumn";
import B012UserColumn from "./columns/B012UserColumn";
import B012CustomerColumn from "./columns/B012CustomerColumn";
import { useMemo } from "react";
import B012ProdColumn from "./columns/B012ProdColumn";
import B012PriceColumn from "./columns/B012PriceColumn";

const B012ListRow = memo((props) => {
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
						<B012ProdColumn loading={loading}>
							{prod}
						</B012ProdColumn>
						<B012CustomerColumn loading={loading}>
							{customer}
						</B012CustomerColumn>

						<B012PriceColumn loading={loading}>
							{value?.Price}
						</B012PriceColumn>
						<B012PriceColumn loading={loading}>
							{value?.QPrice}
						</B012PriceColumn>
						<B012DateColumn loading={loading} onClick={handleSelectDate}>
							{value?.QDate}
						</B012DateColumn>
						<B012UserColumn loading={loading}>
							{employee}
						</B012UserColumn>
						{/* <B012ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B012ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B012ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B012ListRow.displayName = "B012ListRow";
export default B012ListRow;


