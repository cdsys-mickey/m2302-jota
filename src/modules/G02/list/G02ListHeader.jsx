import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import G02AmtColumn from "./columns/G02AmtColumn";
import G02DateColumn from "./columns/G02DateColumn";
import G02IdColumn from "./columns/G02IdColumn";
import G02SupplierColumn from "./columns/G02SupplierColumn";
import G02TelColumn from "./columns/G02TelColumn";
import CheckboxColumn from "@/shared-components/listview/columns/CheckboxColumn";

const G02ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<CheckboxColumn
					slotProps={{
						checkbox: {
							size: "small",
							noPadding: true
						}
					}}
				/>
				<G02IdColumn>單號</G02IdColumn>
				<G02DateColumn>單據日期</G02DateColumn>
				<G02SupplierColumn>客戶名稱</G02SupplierColumn>
				<G02TelColumn>電話</G02TelColumn>
				<G02AmtColumn>應收金額</G02AmtColumn>
			</ListViewHeader>
		);
	})
);

G02ListHeader.propTypes = {};

G02ListHeader.displayName = "G02ListHeader";
export default G02ListHeader;

