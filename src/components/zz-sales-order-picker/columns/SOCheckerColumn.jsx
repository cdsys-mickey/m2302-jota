import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SOCheckerColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={14} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

SOCheckerColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

SOCheckerColumn.displayName = "SOCheckerColumn";
export default SOCheckerColumn;