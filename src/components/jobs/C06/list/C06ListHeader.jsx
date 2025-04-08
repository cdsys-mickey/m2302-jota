import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C06DateColumn from "./columns/C06DateColumn";
import C06DeptNameColumn from "./columns/C06DeptNameColumn";
import C06FlagColumn from "./columns/C06FlagColumn";
import C06IdColumn from "./columns/C06IdColumn";
import C06UserColumn from "./columns/C06UserColumn";
import C06DeptIdColumn from "./columns/C06DeptIdColumn";

const C06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;



		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C06FlagColumn>結</C06FlagColumn>
				<C06IdColumn>訂貨單號</C06IdColumn>
				<C06DateColumn>訂貨日期</C06DateColumn>
				<C06DateColumn>預到日期</C06DateColumn>
				<C06UserColumn>製單人員</C06UserColumn>
				<C06DeptIdColumn>訂貨門市</C06DeptIdColumn>
				<C06DeptNameColumn>出貨門市</C06DeptNameColumn>
			</ListViewHeader>
		);
	})
);

C06ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

C06ListHeader.displayName = "C06ListHeader";
export default C06ListHeader;
