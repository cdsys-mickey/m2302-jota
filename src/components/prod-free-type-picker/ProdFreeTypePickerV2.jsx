import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ProdFreeTypesV2 from "./ProdFreeTypesV2.mjs";

const ProdFreeTypePickerV2 = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				label=""
				options={ProdFreeTypesV2.options}
				getOptionLabel={ProdFreeTypesV2.getOptionLabel}
				isOptionEqualToValue={ProdFreeTypesV2.isOptionEqualToValue}
				findByInput={ProdFreeTypesV2.findOptionByInput}
				notFoundText="試贈樣 ${input} 不存在"
				placeholder="1試,2贈,3樣,(空)試+贈+樣"
				{...rest}
			/>
		);
	})
);

ProdFreeTypePickerV2.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdFreeTypePickerV2.displayName = "ProdFreeTypePickerV2";
export default ProdFreeTypePickerV2;
