import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import CmsGroupTypes from "./CmsGroupTypes.mjs";

const CmsGroupTypePicker = memo(
	forwardRef((props, ref) => {
		const { label = "團體種類", ...rest } = props;

		return (
			<OptionPicker
				label={label}
				ref={ref}
				options={CmsGroupTypes.options}
				getOptionLabel={CmsGroupTypes.getOptionLabel}
				isOptionEqualToValue={CmsGroupTypes.isOptionEqualToValue}
				findByInput={CmsGroupTypes.findByInput}
				notFoundText="團體種類 ${input} 不存在"
				{...rest}
			/>
		);
	})
);

CmsGroupTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsGroupTypePicker.displayName = "CmsGroupTypePicker";
export default CmsGroupTypePicker;
