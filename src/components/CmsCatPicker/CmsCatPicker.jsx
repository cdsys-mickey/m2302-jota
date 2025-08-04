import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import CmsCats from "./CmsCats.mjs";

const CmsCatPicker = memo(
	forwardRef((props, ref) => {
		const { label = "佣金類別", ...rest } = props;

		return (
			<OptionPicker
				label={label}
				ref={ref}
				options={CmsCats.options}
				getOptionLabel={CmsCats.getOptionLabel}
				isOptionEqualToValue={CmsCats.isOptionEqualToValue}
				findByInput={CmsCats.findByInput}
				notFoundText="佣金類別 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

CmsCatPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsCatPicker.displayName = "CmsCatPicker";
export default CmsCatPicker;
