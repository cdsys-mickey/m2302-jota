import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A01ProdIDColumn from "./columns/A01ProdIDColumn";
import A01ProdNameColumn from "./columns/A01ProdNameColumn";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import A01BarcodeColumn from "./columns/A01BarcodeColumn";

const A01ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref}>
				<IndexColumn></IndexColumn>
				<A01ProdIDColumn>商品編號</A01ProdIDColumn>
				<A01ProdNameColumn>品名規格</A01ProdNameColumn>
				<A01BarcodeColumn>條碼</A01BarcodeColumn>
				{/* <A01ClassNColumn>分類</A01ClassNColumn> */}
			</ListViewHeader>
		);
	})
);

A01ListHeader.propTypes = {};

A01ListHeader.displayName = "A01ListHeader";
export default A01ListHeader;
