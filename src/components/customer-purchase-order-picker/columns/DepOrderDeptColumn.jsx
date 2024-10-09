import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const DepOrderDeptColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={9} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

DepOrderDeptColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

DepOrderDeptColumn.displayName = "DepOrderDeptColumn";
