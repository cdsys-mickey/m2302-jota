import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import C03DateColumn from "./columns/C03DateColumn";
import C03DeptColumn from "./columns/C03DeptColumn";
import C03IdColumn from "./columns/C03IdColumn";
import C03UserColumn from "./columns/C03UserColumn";
import C03FlagColumn from "./columns/C03FlagColumn";
import C03CheckerColumn from "./columns/C03CheckerColumn";

const C03ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C03IdColumn>採購單號</C03IdColumn>
				<C03FlagColumn>結</C03FlagColumn>
				<C03FlagColumn>核</C03FlagColumn>
				<C03DateColumn>採購日</C03DateColumn>
				<C03UserColumn>製單人員</C03UserColumn>
				<C03DeptColumn>廠商</C03DeptColumn>

				{/* <C03CheckerColumn>覆核人員</C03CheckerColumn> */}
			</ListViewHeader>
		);
	})
);

C03ListHeader.propTypes = {};

C03ListHeader.displayName = "C03ListHeader";
export default C03ListHeader;
