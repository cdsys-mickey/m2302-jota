import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D05DateColumn from "./columns/D05DateColumn";
import D05DeptColumn from "./columns/D05DeptColumn";
import D05IdColumn from "./columns/D05IdColumn";
import D05UserColumn from "./columns/D05UserColumn";
import D05DeptIdColumn from "./columns/D05DeptIdColumn";
import D05DeptNameColumn from "./columns/D05DeptNameColumn";

const D05ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D05IdColumn>報廢單號</D05IdColumn>
				<D05DateColumn>報廢日期</D05DateColumn>
				<D05UserColumn>倉管人員</D05UserColumn>
			</ListViewHeader>
		);
	})
);

D05ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D05ListHeader.displayName = "D05ListHeader";
export default D05ListHeader;
