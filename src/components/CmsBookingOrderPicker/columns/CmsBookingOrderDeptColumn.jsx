import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const CmsBookingOrderDeptColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={4.5} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

CmsBookingOrderDeptColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

CmsBookingOrderDeptColumn.displayName = "CmsBookingOrderDeptColumn";
