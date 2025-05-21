import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A16IDColumn from "./columns/A16IDColumn";
import A16NameColumn from "./columns/A16NameColumn";
import A16Name2Column from "./columns/A16Name2Column";

const A16ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A16IDColumn>代碼</A16IDColumn>
				<A16Name2Column>簡稱</A16Name2Column>
				<A16NameColumn>名稱</A16NameColumn>
			</ListViewHeader>
		);
	})
);

A16ListHeader.propTypes = {};

A16ListHeader.displayName = "A16ListHeader";
export default A16ListHeader;

