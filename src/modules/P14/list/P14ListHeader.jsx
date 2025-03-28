import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P14IdColumn from "./columns/P14IdColumn";
import P14NameColumn from "./columns/P14NameColumn";

const P14ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P14IdColumn>品項列印序號</P14IdColumn>
				<P14NameColumn>品項列印名稱</P14NameColumn>
			</ListViewHeader>
		);
	})
);

P14ListHeader.propTypes = {};

P14ListHeader.displayName = "P14ListHeader";
export default P14ListHeader;


