import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import G08IDColumn from "./columns/G08IDColumn";
import G08AmtColumn from "./columns/G08AmtColumn";
import G08CustColumn from "./columns/G08CustColumn";
import G08DateColumn from "./columns/G08DateColumn";

const G08ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<G08IDColumn>調整單號</G08IDColumn>
				<G08DateColumn>調整日</G08DateColumn>
				<G08CustColumn>客戶</G08CustColumn>
				<G08AmtColumn>調整金額</G08AmtColumn>
			</ListViewHeader>
		);
	})
);

G08ListHeader.propTypes = {};

G08ListHeader.displayName = "G08ListHeader";
export default G08ListHeader;


