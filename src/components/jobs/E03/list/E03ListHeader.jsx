import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import E03CustomerColumn from "./columns/E03CustomerColumn";
import E03DateColumn from "./columns/E03DateColumn";
import E03FlagColumn from "./columns/E03FlagColumn";
import E03IdColumn from "./columns/E03IdColumn";
import E03UserColumn from "./columns/E03UserColumn";

const E03ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<E03IdColumn>銷退單號</E03IdColumn>
				<E03DateColumn>銷退日期</E03DateColumn>
				<E03DateColumn>應收帳款</E03DateColumn>
				<E03FlagColumn>零售</E03FlagColumn>
				<E03CustomerColumn>客戶</E03CustomerColumn>
				<E03UserColumn>業務人員</E03UserColumn>
			</ListViewHeader>
		);
	})
);

E03ListHeader.propTypes = {};

E03ListHeader.displayName = "E03ListHeader";
export default E03ListHeader;




