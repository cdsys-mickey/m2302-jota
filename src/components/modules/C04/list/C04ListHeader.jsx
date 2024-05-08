import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import C04DateColumn from "./columns/C04DateColumn";
import C04DeptColumn from "./columns/C04DeptColumn";
import C04IdColumn from "./columns/C04IdColumn";
import C04UserColumn from "./columns/C04UserColumn";
import C04FlagColumn from "./columns/C04FlagColumn";

const C04ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C04IdColumn>進貨單號</C04IdColumn>
				<C04DateColumn>進貨日</C04DateColumn>
				<C04UserColumn>倉管人員</C04UserColumn>
				<C04DeptColumn>廠商</C04DeptColumn>
			</ListViewHeader>
		);
	})
);

C04ListHeader.propTypes = {};

C04ListHeader.displayName = "C04ListHeader";
export default C04ListHeader;
