import B04 from "@/modules/md-b04";
import { OptionPicker } from "@/shared-components";
import { forwardRef, memo } from "react";

export const B04OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPicker
				ref={ref}
				options={B04.options}
				getOptionLabel={B04.getOptionLabel}
				isOptionEqualToValue={B04.isOptionEqualToValue}
				defaultValue={B04.findById(B04.OrderBy.SUPPLIER)}
				findByInput={B04.findById}
				notFoundText="排序 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

B04OrderByPicker.propTypes = {};

B04OrderByPicker.displayName = "B04OrderByPicker";

