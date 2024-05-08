import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import C02DateColumn from "./columns/C02DateColumn";
import C02DeptColumn from "./columns/C02DeptColumn";
import C02IdColumn from "./columns/C02IdColumn";
import C02UserColumn from "./columns/C02UserColumn";
import C02FlagColumn from "./columns/C02FlagColumn";

const C02ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C02IdColumn>請購單號</C02IdColumn>
				<C02FlagColumn>核</C02FlagColumn>
				<C02FlagColumn>採</C02FlagColumn>
				<C02DateColumn>請購日</C02DateColumn>
				<C02DeptColumn>請購部門</C02DeptColumn>
				<C02UserColumn>製單人員</C02UserColumn>
			</ListViewHeader>
		);
	})
);

C02ListHeader.propTypes = {};

C02ListHeader.displayName = "C02ListHeader";
export default C02ListHeader;
