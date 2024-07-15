import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import D06DateColumn from "./columns/D06DateColumn";
import D06DeptColumn from "./columns/D06DeptColumn";
import D06IdColumn from "./columns/D06IdColumn";
import D06UserColumn from "./columns/D06UserColumn";
import D06FlagColumn from "./columns/D06FlagColumn";
import D06DeptIdColumn from "./columns/D06DeptIdColumn";
import D06DeptNameColumn from "./columns/D06DeptNameColumn";
import D06NumColumn from "./columns/D06NumColumn";
import PropTypes from "prop-types";

const D06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D06IdColumn>結餘單號</D06IdColumn>
				<D06DateColumn>結餘日期</D06DateColumn>
				<D06UserColumn>製單人員</D06UserColumn>
				<D06DeptColumn>生產線別</D06DeptColumn>
			</ListViewHeader>
		);
	})
);

D06ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D06ListHeader.displayName = "D06ListHeader";
export default D06ListHeader;
