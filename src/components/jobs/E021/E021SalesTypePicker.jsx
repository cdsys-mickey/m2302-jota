import E021 from "@/modules/md-e021";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E021SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				// required
				// disableClearable
				// label=""
				options={E021.salesTypeOptions}
				getOptionLabel={E021.getSalesTypeOptionLabel}
				isOptionEqualToValue={E021.isSalesTypeOptionEqualToValue}
				findByInput={E021.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${id} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E021SalesTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E021SalesTypePicker.displayName = "E021SalesTypePicker";
export default E021SalesTypePicker;

