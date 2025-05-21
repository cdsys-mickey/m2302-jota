import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import G06YMColumn from "./columns/G06YMColumn";
import G06NameColumn from "./columns/G06NameColumn";
import G06CustColumn from "./columns/G06CustColumn";
import G06SessionColumn from "./columns/G06SessionColumn";

const G06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<G06YMColumn>帳款年月</G06YMColumn>
				<G06SessionColumn>期別</G06SessionColumn>
				<G06CustColumn>客戶</G06CustColumn>
				<G06NameColumn>收款</G06NameColumn>
			</ListViewHeader>
		);
	})
);

G06ListHeader.propTypes = {};

G06ListHeader.displayName = "G06ListHeader";
export default G06ListHeader;

