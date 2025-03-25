import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P14IdColumn from "./columns/P14IdColumn";
import P14SupplierColumn from "./columns/P14SupplierColumn";
import P14UserColumn from "./columns/P14UserColumn";

const P14ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P14IdColumn>清單編號</P14IdColumn>
				<P14SupplierColumn>清單名稱</P14SupplierColumn>
				<P14UserColumn>製單人員</P14UserColumn>
			</ListViewHeader>
		);
	})
);

P14ListHeader.propTypes = {};

P14ListHeader.displayName = "P14ListHeader";
export default P14ListHeader;


