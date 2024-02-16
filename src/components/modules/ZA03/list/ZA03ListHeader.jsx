import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import ZA03IDColumn from "./columns/ZA03IDColumn";
import ZA03NameColumn from "./columns/ZA03NameColumn";

const ZA03ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<ZA03IDColumn>帳號</ZA03IDColumn>
				<ZA03NameColumn>名稱</ZA03NameColumn>
			</ListViewHeader>
		);
	})
);

ZA03ListHeader.propTypes = {};

ZA03ListHeader.displayName = "ZA03ListHeader";
export default ZA03ListHeader;
