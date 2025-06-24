import E01 from "@/modules/E01.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E01SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				// disableClearable
				label=""
				options={E01.salesTypeOptions}
				getOptionLabel={E01.getSalesTypeOptionLabel}
				isOptionEqualToValue={E01.isSalesTypeOptionEqualToValue}
				findByInput={E01.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${input} 不存在"
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
