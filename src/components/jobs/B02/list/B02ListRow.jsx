import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import B02CustomerColumn from "./columns/B02CustomerColumn";
import B02DateColumn from "./columns/B02DateColumn";
import B02PriceColumn from "./columns/B02PriceColumn";
import B02ProdColumn from "./columns/B02ProdColumn";
import B02UserColumn from "./columns/B02UserColumn";

const B02ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { ProdID, ProdData_N, PackData_N, CustID, CustData_N, QEmplID, EmplData_N } = value || {};

	const cust = useMemo(() => {
		return [
			// CustID, 
			CustData_N].filter(Boolean).join(" ");
	}, [CustData_N])

	const prod = useMemo(() => {
		return [
			ProdID,
			ProdData_N]
			.filter(Boolean).join(" ").concat(PackData_N ? `(${PackData_N})` : "");
	}, [PackData_N, ProdData_N, ProdID])

	const employee = useMemo(() => {
		return [
			EmplData_N
		].filter(Boolean).join(" ");
	}, [EmplData_N])

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
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
						<B02CustomerColumn>
							{cust}
						</B02CustomerColumn>
						<B02ProdColumn>
							{prod}
						</B02ProdColumn>
						<B02PriceColumn>
							{value?.QPrice}
						</B02PriceColumn>
						<B02DateColumn>
							{value?.QDate}
						</B02DateColumn>
						<B02UserColumn>
							{employee}
						</B02UserColumn>
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
	promptCopyAuth: PropTypes.func,
};

B02ListRow.displayName = "B02ListRow";
export default B02ListRow;


