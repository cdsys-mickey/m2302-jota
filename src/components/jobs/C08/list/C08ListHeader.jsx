import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C08DateColumn from "./columns/C08DateColumn";
import C08DeptIdColumn from "./columns/C08DeptIdColumn";
import C08DeptNameColumn from "./columns/C08DeptNameColumn";
import C08IdColumn from "./columns/C08IdColumn";

const C08ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C08IdColumn>撥出單號</C08IdColumn>
				<C08DateColumn>撥出日期</C08DateColumn>
				<C08DeptIdColumn>撥出門市</C08DeptIdColumn>
				<C08IdColumn>撥入單號</C08IdColumn>
				<C08DeptIdColumn>撥入門市</C08DeptIdColumn>
				<C08DeptNameColumn></C08DeptNameColumn>
				<C08IdColumn>訂貨單號</C08IdColumn>
			</ListViewHeader>
		);
	})
);

C08ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

C08ListHeader.displayName = "C08ListHeader";
export default C08ListHeader;
