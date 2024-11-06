import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import B02IdColumn from "./columns/B02IdColumn";
import B02DateColumn from "./columns/B02DateColumn";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import B02SupplierColumn from "./columns/B02SupplierColumn";
import B02UserColumn from "./columns/B02UserColumn";
import B02CustomerColumn from "./columns/B02CustomerColumn";
import { useMemo } from "react";
import B02ProdColumn from "./columns/B02ProdColumn";
import B02PriceColumn from "./columns/B02PriceColumn";

const B02ListRow = memo((props) => {
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
			ProdID,
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
						<B02CustomerColumn loading={loading}>
							{cust}
						</B02CustomerColumn>
						<B02ProdColumn loading={loading}>
							{prod}
						</B02ProdColumn>

						{/* <B02PriceColumn loading={loading}>
							{value?.Price}
						</B02PriceColumn> */}
						<B02PriceColumn loading={loading}>
							{value?.QPrice}
						</B02PriceColumn>
						<B02DateColumn loading={loading}>
							{value?.QDate}
						</B02DateColumn>
						<B02UserColumn loading={loading}>
							{employee}
						</B02UserColumn>
						{/* <B02ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B02ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B02ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B02ListRow.displayName = "B02ListRow";
export default B02ListRow;


