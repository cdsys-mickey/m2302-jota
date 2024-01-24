import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A06IDColumn from "./columns/A06IDColumn";
import A06NameColumn from "./columns/A06NameColumn";

const A06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A06IDColumn>代碼</A06IDColumn>
				<A06NameColumn>名稱</A06NameColumn>
			</ListViewHeader>
		);
	})
);

A06ListHeader.propTypes = {};

A06ListHeader.displayName = "A06ListHeader";
export default A06ListHeader;
