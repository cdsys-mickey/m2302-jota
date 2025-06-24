import E03 from "@/modules/E03.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E03SalesTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E03.salesTypeOptions}
				getOptionLabel={E03.getSalesTypeOptionLabel}
				isOptionEqualToValue={E03.isSalesTypeOptionEqualToValue}
				findByInput={E03.findSalesTypeOptionByInput}
				notFoundText="銷售類別 ${input} 不存在"
				placeholder="空白: 零售+批發"
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


