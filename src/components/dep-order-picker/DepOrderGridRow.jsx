import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderCheckerColumn } from "./columns/DepOrderCheckerColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderDeptNameColumn } from "./columns/DepOrderDeptNameColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";
import { useMemo } from "react";

export const DepOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		const deptName = useMemo(() => {
			return `${value["訂貨門市"]} ${value["訂貨門市名稱"]}`;
		}, [value]);
		return (
			<Grid ref={ref} container columns={24} spacing={2}>
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

DepOrderGridRow.propTypes = {
	value: PropTypes.object,
};

DepOrderGridRow.displayName = "DepOrderGridRow";
