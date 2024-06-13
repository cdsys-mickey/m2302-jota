import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const TxoOrderFlagColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={1} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

TxoOrderFlagColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

TxoOrderFlagColumn.displayName = "TxoOrderFlagColumn";


