import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SOIdColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={5} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

SOIdColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

SOIdColumn.displayName = "SOIdColumn";
export default SOIdColumn;