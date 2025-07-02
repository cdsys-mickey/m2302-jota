import { OptionPicker } from "@/shared-components";
import { forwardRef, memo } from "react";
import A18OrderBy from "./A18OrderBy.mjs";

export const A18OrderByPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<OptionPicker
				ref={ref}
				options={A18OrderBy.options}
				getOptionLabel={A18OrderBy.getOptionLabel}
				isOptionEqualToValue={A18OrderBy.isOptionEqualToValue}
				defaultValue={null}
				findByInput={A18OrderBy.findById}
				notFoundText="排序 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

A18OrderByPicker.propTypes = {};

A18OrderByPicker.displayName = "A18OrderByPicker";
