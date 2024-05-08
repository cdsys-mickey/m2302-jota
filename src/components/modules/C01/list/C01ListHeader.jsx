import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import C01DateColumn from "./columns/C01DateColumn";
import C01DeptColumn from "./columns/C01DeptColumn";
import C01IdColumn from "./columns/C01IdColumn";
import C01UserColumn from "./columns/C01UserColumn";
import C01FlagColumn from "./columns/C01FlagColumn";

const C01ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<C01IdColumn>請購單號</C01IdColumn>
				<C01FlagColumn>核</C01FlagColumn>
				<C01FlagColumn>採</C01FlagColumn>
				<C01DateColumn>請購日</C01DateColumn>
				<C01DeptColumn>請購部門</C01DeptColumn>
				<C01UserColumn>製單人員</C01UserColumn>
			</ListViewHeader>
		);
	})
);

C01ListHeader.propTypes = {};

C01ListHeader.displayName = "C01ListHeader";
export default C01ListHeader;
