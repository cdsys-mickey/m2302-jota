import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import B012CustomerColumn from "./columns/B012CustomerColumn";
import B012DateColumn from "./columns/B012DateColumn";
import B012PriceColumn from "./columns/B012PriceColumn";
import B012ProdColumn from "./columns/B012ProdColumn";
import B012UserColumn from "./columns/B012UserColumn";

const B012ListRow = memo((props) => {
	const { index, style, value, loading, onClick, handleSelectDate } = props;
	const { CustID, CustData_N, ProdID, ProdData_N, PackData_N, QEmplID, EmplData_N } = value || {};

	const customer = useMemo(() => {
		return [CustData_N].filter(Boolean).join(" ");
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
						<B012ProdColumn className="mark">
							{prod}
						</B012ProdColumn>
						<B012CustomerColumn>
							{customer}
						</B012CustomerColumn>
						<B012PriceColumn>
							{value?.QPrice}
						</B012PriceColumn>
						<B012DateColumn>
							{value?.QDate}
						</B012DateColumn>
						<B012UserColumn className="mark">
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


