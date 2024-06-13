import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const TxoOrderDeptIdColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={3} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

TxoOrderDeptIdColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

TxoOrderDeptIdColumn.displayName = "TxoOrderDeptIdColumn";


