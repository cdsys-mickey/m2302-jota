import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import B04CustomerColumn from "./columns/B04CustomerColumn";
import B04DateColumn from "./columns/B04DateColumn";
import B04PriceColumn from "./columns/B04PriceColumn";
import B04ProdColumn from "./columns/B04ProdColumn";
import B04UserColumn from "./columns/B04UserColumn";
import ListRow from "@/shared-components/listview/ListRow";

const B04ListRow = memo((props) => {
	const { index, style, value, loading, onClick } = props;
	const { CustID, CustData_N, ProdID, ProdData_N, PackData_N, QEmplID, EmplData_N } = value || {};

	const cust = useMemo(() => {
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
		<ListRow style={style} onClick={onClick}>
			<IndexColumn title={index}></IndexColumn>
			<B04CustomerColumn>
				{cust}
			</B04CustomerColumn>
			<B04ProdColumn>
				{prod}
			</B04ProdColumn>
			<B04DateColumn>
				{value?.QDate}
			</B04DateColumn>
			<B04PriceColumn >
				{value?.Price}
			</B04PriceColumn>
			<B04PriceColumn>
				{value?.QPrice}
			</B04PriceColumn>
			<B04UserColumn >
				{employee}
			</B04UserColumn>
		</ListRow>
	);
});

B04ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

B04ListRow.displayName = "B04ListRow";
export default B04ListRow;



