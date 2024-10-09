import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SODateColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={5} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

SODateColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

SODateColumn.displayName = "SODateColumn";
export default SODateColumn;