import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import E01IdColumn from "./columns/E01IdColumn";
import E01DateColumn from "./columns/E01DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import E01SupplierColumn from "./columns/E01SupplierColumn";
import E01UserColumn from "./columns/E01UserColumn";
import E01CustomerColumn from "./columns/E01CustomerColumn";
import { useMemo } from "react";
import E01ProdColumn from "./columns/E01ProdColumn";
import E01PriceColumn from "./columns/E01PriceColumn";
import E01FlagColumn from "./columns/E01FlagColumn";

const E01ListRow = memo((props) => {
	const { index, style, value, loading, onClick, handleSelectDate } = props;

	const customer = useMemo(() => {
		const { 客戶代碼, 客戶簡稱 } = value || "";
		return [客戶代碼, 客戶簡稱].filter(Boolean).join(" ");
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
						<E01IdColumn loading={loading}>
							{value?.訂貨單號 || ""}
						</E01IdColumn>
						<E01FlagColumn loading={loading}>
							{value?.結清 || ""}
						</E01FlagColumn>
						<E01DateColumn loading={loading} onClick={handleSelectDate}>
							{value?.訂貨日期 || ""}
						</E01DateColumn>

						<E01FlagColumn loading={loading}>
							{value?.零售 || ""}
						</E01FlagColumn>
						<E01CustomerColumn loading={loading}>
							{customer}
						</E01CustomerColumn>
						<E01UserColumn loading={loading}>
							{value?.業務人員 || ""}
						</E01UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

E01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

E01ListRow.displayName = "E01ListRow";
export default E01ListRow;


