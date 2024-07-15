import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A20IDColumn from "./columns/A20IDColumn";
import A20NameColumn from "./columns/A20NameColumn";

const A20ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A20IDColumn>代碼</A20IDColumn>
				<A20NameColumn>名稱</A20NameColumn>
			</ListViewHeader>
		);
	})
);

A20ListHeader.propTypes = {};

A20ListHeader.displayName = "A20ListHeader";
export default A20ListHeader;
