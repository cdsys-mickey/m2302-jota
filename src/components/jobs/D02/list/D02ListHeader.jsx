import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import D02DateColumn from "./columns/D02DateColumn";
import D02DeptColumn from "./columns/D02DeptColumn";
import D02IdColumn from "./columns/D02IdColumn";
import D02UserColumn from "./columns/D02UserColumn";
import D02FlagColumn from "./columns/D02FlagColumn";
import D02DeptIdColumn from "./columns/D02DeptIdColumn";
import D02DeptNameColumn from "./columns/D02DeptNameColumn";
import D02NumColumn from "./columns/D02NumColumn";
import PropTypes from "prop-types";

const D02ListHeader = memo(
	forwardRef((props, ref) => {
		const { expChecking, ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D02IdColumn>退料單號</D02IdColumn>
				<D02DateColumn>退料日期</D02DateColumn>
				<D02UserColumn>製單人員</D02UserColumn>
				<D02DeptColumn>線別</D02DeptColumn>
				{expChecking && (
					<>
						<D02IdColumn>商品編號</D02IdColumn>
						<D02NumColumn>數量</D02NumColumn>
						<D02DateColumn>有效期限</D02DateColumn>
					</>
				)}
			</ListViewHeader>
		);
	})
);

D02ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D02ListHeader.displayName = "D02ListHeader";
export default D02ListHeader;
