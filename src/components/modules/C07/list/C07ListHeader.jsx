import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C07DateColumn from "./columns/C07DateColumn";
import C07DeptIdColumn from "./columns/C07DeptIdColumn";
import C07DeptNameColumn from "./columns/C07DeptNameColumn";
import C07FlagColumn from "./columns/C07FlagColumn";
import C07IdColumn from "./columns/C07IdColumn";
import C07UserColumn from "./columns/C07UserColumn";

const C07ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C07FlagColumn>結</C07FlagColumn>
				<C07IdColumn>訂貨單號</C07IdColumn>
				<C07DateColumn>訂貨日期</C07DateColumn>
				<C07DateColumn>預到日期</C07DateColumn>
				<C07UserColumn>製單人員</C07UserColumn>
				<C07DeptIdColumn>訂貨門市</C07DeptIdColumn>
				<C07DeptIdColumn>出貨門市</C07DeptIdColumn>
				<C07DeptNameColumn>名稱</C07DeptNameColumn>
			</ListViewHeader>
		);
	})
);

C07ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

C07ListHeader.displayName = "C07ListHeader";
export default C07ListHeader;
