import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import SOCheckerColumn from "./columns/SOCheckerColumn";
import SODateColumn from "./columns/SODateColumn";
import SOIdColumn from "./columns/SOIdColumn";

const SalesOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<SOIdColumn header>採購單號</SOIdColumn>
				<SODateColumn header>採購日期</SODateColumn>
				<SOCheckerColumn header>覆核</SOCheckerColumn>
			</OptionPickerGridHeader>
		);
	}
);

SalesOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SalesOrderGridHeader.displayName = "SalesOrderGridHeader";
export default SalesOrderGridHeader;