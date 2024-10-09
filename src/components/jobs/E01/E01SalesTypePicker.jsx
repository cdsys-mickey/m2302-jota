import E01 from "@/modules/md-e01";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E01SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E01.salesTypeOptions}
				getOptionLabel={E01.getSalesTypeOptionLabel}
				isOptionEqualToValue={E01.isSalesTypeOptionEqualToValue}
				findByInput={E01.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${id} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E01SalesTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E01SalesTypePicker.displayName = "E01SalesTypePicker";
export default E01SalesTypePicker;
