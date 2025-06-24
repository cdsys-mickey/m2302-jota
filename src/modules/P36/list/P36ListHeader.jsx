import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P36IDColumn from "./columns/P36IDColumn";
import P36NameColumn from "./columns/P36NameColumn";

const P36ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P36IDColumn>代碼</P36IDColumn>
				<P36NameColumn>名稱</P36NameColumn>
			</ListViewHeader>
		);
	})
);

P36ListHeader.propTypes = {};

P36ListHeader.displayName = "P36ListHeader";
export default P36ListHeader;



