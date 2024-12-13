import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import F03IdColumn from "./columns/F03IdColumn";
import F03OrderNameColumn from "./columns/F03OrderNameColumn";
import F03UserColumn from "./columns/F03UserColumn";

const F03ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<F03IdColumn>清單編號</F03IdColumn>
				<F03OrderNameColumn>清單名稱</F03OrderNameColumn>
			</ListViewHeader>
		);
	})
);

F03ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

F03ListHeader.displayName = "F03ListHeader";
export default F03ListHeader;

