import B02 from "@/modules/md-b02";
import { OptionPicker } from "@/shared-components";
import { forwardRef, memo } from "react";

export const B02OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPicker
				ref={ref}
				options={B02.options}
				getOptionLabel={B02.getOptionLabel}
				isOptionEqualToValue={B02.isOptionEqualToValue}
				defaultValue={B02.findById(B02.OrderBy.SUPPLIER)}
				findByInput={B02.findById}
				notFoundText="排序 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

B02OrderByPicker.propTypes = {};

B02OrderByPicker.displayName = "B02OrderByPicker";
