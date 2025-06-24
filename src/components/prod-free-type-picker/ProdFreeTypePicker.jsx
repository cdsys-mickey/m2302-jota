import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ProdFreeTypes from "./ProdFreeTypes.mjs";

const ProdFreeTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				label=""
				options={ProdFreeTypes.options}
				getOptionLabel={ProdFreeTypes.getOptionLabel}
				isOptionEqualToValue={ProdFreeTypes.isOptionEqualToValue}
				findByInput={ProdFreeTypes.findOptionByInput}
				notFoundText="試贈樣 ${input} 不存在"
				placeholder="Y:只含試贈樣 N:不含試贈樣, 空白: 不篩選"
				{...rest}
			/>
		);
	})
);

ProdFreeTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdFreeTypePicker.displayName = "ProdFreeTypePicker";
export default ProdFreeTypePicker;
