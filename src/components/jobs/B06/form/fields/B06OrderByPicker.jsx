import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import B06 from "@/modules/md-b06";

export const B06OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPickerWrapper
				ref={ref}
				options={B06.options}
				getOptionLabel={B06.getOptionLabel}
				isOptionEqualToValue={B06.isOptionEqualToValue}
				defaultValue={B06.getById(B06.OrderBy.PROD)}
				{...rest}
			/>
		);
	})
);

B06OrderByPicker.propTypes = {};

B06OrderByPicker.displayName = "B06OrderByPicker";
