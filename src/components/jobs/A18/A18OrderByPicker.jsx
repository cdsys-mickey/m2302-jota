import A18 from "@/modules/md-a18";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { forwardRef, memo } from "react";

export const A18OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPickerWrapper
				ref={ref}
				options={A18.options}
				getOptionLabel={A18.getOptionLabel}
				isOptionEqualToValue={A18.isOptionEqualToValue}
				defaultValue={null}
				findByInput={A18.findById}
				notFoundText="排序 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

A18OrderByPicker.propTypes = {};

A18OrderByPicker.displayName = "A18OrderByPicker";
