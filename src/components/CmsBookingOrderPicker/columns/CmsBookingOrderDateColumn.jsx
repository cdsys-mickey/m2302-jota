import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const CmsBookingOrderDateColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={3.5} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

CmsBookingOrderDateColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

CmsBookingOrderDateColumn.displayName = "CmsBookingOrderDateColumn";
