import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import { TxoOrderDateColumn } from "./columns/TxoOrderDateColumn";
import { TxoOrderDeptColumn } from "./columns/TxoOrderDeptColumn";
import { TxoOrderDeptIdColumn } from "./columns/TxoOrderDeptIdColumn";
import { TxoOrderIdColumn } from "./columns/TxoOrderIdColumn";

export const TxoOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		const deptName = useMemo(() => {
			return `${value["撥出門市"]} ${value["撥出門市名稱"]}`;
		}, [value]);
		return (
			<Grid ref={ref} container columns={24} spacing={1}>
				<TxoOrderIdColumn>{value["撥出單號"]}</TxoOrderIdColumn>
				<TxoOrderDateColumn>{value["撥出日期"]}</TxoOrderDateColumn>
				<TxoOrderIdColumn>{value["撥入單號"]}</TxoOrderIdColumn>
				<TxoOrderIdColumn>{value["訂貨單號"]}</TxoOrderIdColumn>
				<TxoOrderDeptIdColumn>{value["撥入門市"]}</TxoOrderDeptIdColumn>
				<TxoOrderDeptColumn>{deptName}</TxoOrderDeptColumn>
			</Grid>
		);
	})
);

TxoOrderGridRow.propTypes = {
	value: PropTypes.object,
};

TxoOrderGridRow.displayName = "TxoOrderGridRow";
