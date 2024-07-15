import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import D041DateColumn from "./columns/D041DateColumn";
import D041DeptColumn from "./columns/D041DeptColumn";
import D041IdColumn from "./columns/D041IdColumn";
import D041UserColumn from "./columns/D041UserColumn";
import D041FlagColumn from "./columns/D041FlagColumn";
import D041DeptIdColumn from "./columns/D041DeptIdColumn";
import D041DeptNameColumn from "./columns/D041DeptNameColumn";
import D041NumColumn from "./columns/D041NumColumn";
import PropTypes from "prop-types";

const D041ListHeader = memo(
	forwardRef((props, ref) => {
		const { expChecking, ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D041IdColumn>入庫單號</D041IdColumn>
				<D041DateColumn>入庫日期</D041DateColumn>
				<D041UserColumn>倉管人員</D041UserColumn>
				<D041DeptColumn>線別</D041DeptColumn>
				{expChecking && (
					<>
						<D041IdColumn>商品編號</D041IdColumn>
						<D041NumColumn>數量</D041NumColumn>
						<D041DateColumn>有效期限</D041DateColumn>
					</>
				)}
			</ListViewHeader>
		);
	})
);

D041ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D041ListHeader.displayName = "D041ListHeader";
export default D041ListHeader;
