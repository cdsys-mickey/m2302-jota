import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B06ProdNameColumn from "./columns/B06ProdNameColumn";
import B06SpNameColumn from "./columns/B06SpNameColumn";
import B06ProdIdColumn from "./columns/B06ProdIdColumn";
import B06PriceColumn from "./columns/B06PriceColumn";
import B06DateColumn from "./columns/B06DateColumn";
import B06InqIdColumn from "./columns/B06InqIdColumn";

const B06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} spacing={1} {...rest}>
				<IndexColumn></IndexColumn>
				<B06SpNameColumn>廠商簡稱</B06SpNameColumn>
				<B06ProdIdColumn>商品編號</B06ProdIdColumn>
				<B06ProdNameColumn>品名規格</B06ProdNameColumn>
				<B06PriceColumn>廠商報價</B06PriceColumn>
				<B06DateColumn>詢價日</B06DateColumn>
				<B06InqIdColumn>詢價單號</B06InqIdColumn>
			</ListViewHeader>
		);
	})
);

B06ListHeader.propTypes = {};

B06ListHeader.displayName = "B06ListHeader";
export default B06ListHeader;
