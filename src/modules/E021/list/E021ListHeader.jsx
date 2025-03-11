import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import E021CustomerColumn from "./columns/E021CustomerColumn";
import E021DateColumn from "./columns/E021DateColumn";
import E021FlagColumn from "./columns/E021FlagColumn";
import E021IdColumn from "./columns/E021IdColumn";
import E021UserColumn from "./columns/E021UserColumn";

const E021ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<E021IdColumn>銷貨單號</E021IdColumn>
				<E021DateColumn>銷貨日期</E021DateColumn>
				<E021FlagColumn>零售</E021FlagColumn>
				<E021CustomerColumn>客戶</E021CustomerColumn>
				<E021UserColumn>業務人員</E021UserColumn>
			</ListViewHeader>
		);
	})
);

E021ListHeader.propTypes = {};

E021ListHeader.displayName = "E021ListHeader";
export default E021ListHeader;



