import B06 from "@/modules/md-b06";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { forwardRef, memo } from "react";

export const B06OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPickerWrapper
				ref={ref}
				options={B06.options}
				getOptionLabel={B06.getOptionLabel}
				isOptionEqualToValue={B06.isOptionEqualToValue}
				defaultValue={B06.findById(B06.OrderBy.PROD)}
				findByInput={B06.findById}
				notFoundText="排序 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

B06OrderByPicker.propTypes = {};

B06OrderByPicker.displayName = "B06OrderByPicker";
