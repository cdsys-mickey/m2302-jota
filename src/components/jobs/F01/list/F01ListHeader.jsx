import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import F01IdColumn from "./columns/F01IdColumn";
import F01SupplierColumn from "./columns/F01SupplierColumn";
import F01UserColumn from "./columns/F01UserColumn";

const F01ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<F01IdColumn>清單編號</F01IdColumn>
				<F01SupplierColumn>清單名稱</F01SupplierColumn>
				<F01UserColumn>製單人員</F01UserColumn>
			</ListViewHeader>
		);
	})
);

F01ListHeader.propTypes = {};

F01ListHeader.displayName = "F01ListHeader";
export default F01ListHeader;

