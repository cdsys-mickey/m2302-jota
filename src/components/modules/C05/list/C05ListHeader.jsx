import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C05DateColumn from "./columns/C05DateColumn";
import C05DeptColumn from "./columns/C05DeptColumn";
import C05IdColumn from "./columns/C05IdColumn";
import C05UserColumn from "./columns/C05UserColumn";

const C05ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C05IdColumn>退貨單號</C05IdColumn>
				<C05DateColumn>退貨日期</C05DateColumn>
				<C05UserColumn>倉管人員</C05UserColumn>
				<C05DeptColumn>廠商</C05DeptColumn>
			</ListViewHeader>
		);
	})
);

C05ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

C05ListHeader.displayName = "C05ListHeader";
export default C05ListHeader;
