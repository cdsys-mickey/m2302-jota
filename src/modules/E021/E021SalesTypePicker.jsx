import E021 from "@/modules/E021/E021.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E021SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				// disableClearable
				// label=""
				options={E021.salesTypeOptions}
				getOptionLabel={E021.getSalesTypeOptionLabel}
				isOptionEqualToValue={E021.isSalesTypeOptionEqualToValue}
				findByInput={E021.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${input} 不存在"
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

