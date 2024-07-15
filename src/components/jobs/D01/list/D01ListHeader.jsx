import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import D01DateColumn from "./columns/D01DateColumn";
import D01DeptColumn from "./columns/D01DeptColumn";
import D01IdColumn from "./columns/D01IdColumn";
import D01UserColumn from "./columns/D01UserColumn";
import D01FlagColumn from "./columns/D01FlagColumn";
import D01DeptIdColumn from "./columns/D01DeptIdColumn";
import D01DeptNameColumn from "./columns/D01DeptNameColumn";
import D01NumColumn from "./columns/D01NumColumn";
import PropTypes from "prop-types";

const D01ListHeader = memo(
	forwardRef((props, ref) => {
		const { expChecking, ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D01IdColumn>領料單號</D01IdColumn>
				<D01DateColumn>領料日期</D01DateColumn>
				<D01UserColumn>製單人員</D01UserColumn>
				<D01DeptColumn>線別</D01DeptColumn>
				{expChecking && (
					<>
						<D01IdColumn>商品編號</D01IdColumn>
						<D01NumColumn>數量</D01NumColumn>
						<D01DateColumn>有效期限</D01DateColumn>
					</>
				)}
			</ListViewHeader>
		);
	})
);

D01ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D01ListHeader.displayName = "D01ListHeader";
export default D01ListHeader;
