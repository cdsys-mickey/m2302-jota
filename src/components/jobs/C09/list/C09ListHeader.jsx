import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C09DateColumn from "./columns/C09DateColumn";
import C09DeptColumn from "./columns/C09DeptColumn";
import C09IdColumn from "./columns/C09IdColumn";
import C09UserColumn from "./columns/C09UserColumn";
import C09DeptIdColumn from "./columns/C09DeptIdColumn";
import C09DeptNameColumn from "./columns/C09DeptNameColumn";

const C09ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C09IdColumn>撥入單號</C09IdColumn>
				<C09DateColumn>撥入日期</C09DateColumn>
				<C09IdColumn>撥出單號</C09IdColumn>
				<C09DeptColumn>撥出門市</C09DeptColumn>

				<C09UserColumn>驗收人員</C09UserColumn>
			</ListViewHeader>
		);
	})
);

C09ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

C09ListHeader.displayName = "C09ListHeader";
export default C09ListHeader;
