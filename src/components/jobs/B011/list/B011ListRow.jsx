import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import B011CustomerColumn from "./columns/B011CustomerColumn";
import B011DateColumn from "./columns/B011DateColumn";
import B011PriceColumn from "./columns/B011PriceColumn";
import B011ProdColumn from "./columns/B011ProdColumn";
import B011UserColumn from "./columns/B011UserColumn";

const B011ListRow = memo((props) => {
	const { index, style, value, loading, onClick, handleSelectDate } = props;
	const { CustID, CustData_N, ProdID, ProdData_N, PackData_N, QEmplID, EmplData_N } = value || {};
	const customer = useMemo(() => {
		return [
			// CustID, 
			CustData_N].filter(Boolean).join(" ");
	}, [CustData_N])

	const prod = useMemo(() => {
		return [
			// ProdID, 
			ProdData_N]
			.filter(Boolean).join(" ").concat(PackData_N ? `(${PackData_N})` : "");
	}, [PackData_N, ProdData_N])

	const employee = useMemo(() => {
		return [
			EmplData_N
		].filter(Boolean).join(" ");
	}, [EmplData_N])

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
				<Box sx={{
					"&:hover .mark": {
						color: orange[500]
					}
				}}>
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
						<B011CustomerColumn className="mark" >
							{customer}
						</B011CustomerColumn>
						<B011ProdColumn >
							{prod}
						</B011ProdColumn>

						<B011PriceColumn>
							{value?.Price}
						</B011PriceColumn>
						<B011PriceColumn>
							{value?.QPrice}
						</B011PriceColumn>
						<B011DateColumn onClick={handleSelectDate}>
							{value?.QDate}
						</B011DateColumn>
						<B011UserColumn className="mark" >
							{employee}
						</B011UserColumn>
						{/* <B011ClassNColumn loading={loading}>
						{value?.Clas_N}
					</B011ClassNColumn> */}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

B011ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B011ListRow.displayName = "B011ListRow";
export default B011ListRow;

