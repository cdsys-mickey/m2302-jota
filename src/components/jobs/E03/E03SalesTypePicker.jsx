import E03 from "@/modules/md-e03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E03SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E03.salesTypeOptions}
				getOptionLabel={E03.getSalesTypeOptionLabel}
				isOptionEqualToValue={E03.isSalesTypeOptionEqualToValue}
				findByInput={E03.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${id} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E03SalesTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E03SalesTypePicker.displayName = "E03SalesTypePicker";
export default E03SalesTypePicker;


