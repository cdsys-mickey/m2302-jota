import { FlexOptionGridColumn } from "@/shared-components/option-picker/grid/FlexOptionGridColumn";
import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const DepOrderFlagColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<FlexOptionGridColumn ref={ref} xs={24} sm={2} {...rest}>
				{children}
			</FlexOptionGridColumn>
		);
	})
);

DepOrderFlagColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

DepOrderFlagColumn.displayName = "DepOrderFlagColumn";
