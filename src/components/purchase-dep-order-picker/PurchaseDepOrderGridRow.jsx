import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";

const PurchaseDepOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		const deptName = useMemo(() => {
			return `${value["訂貨門市"]} ${value["訂貨門市名稱"]}`;
		}, [value]);

		return (
			<Grid ref={ref} container columns={24} spacing={1}>
				<DepOrderFlagColumn>{value["結"]}</DepOrderFlagColumn>
				<DepOrderIdColumn>{value["訂貨單號"]}</DepOrderIdColumn>
				<DepOrderDateColumn>{value["訂貨日期"]}</DepOrderDateColumn>
				<DepOrderDateColumn>{value["預到日期"]}</DepOrderDateColumn>
				<DepOrderUserColumn>{value["製單人員"]}</DepOrderUserColumn>
				<DepOrderDeptIdColumn>{value["出貨門市"]}</DepOrderDeptIdColumn>
				<DepOrderDeptColumn>{deptName}</DepOrderDeptColumn>
			</Grid>
		);
	})
);

PurchaseDepOrderGridRow.propTypes = {
	value: PropTypes.object,
};

PurchaseDepOrderGridRow.displayName = "DepOrderGridRow";
export default PurchaseDepOrderGridRow;