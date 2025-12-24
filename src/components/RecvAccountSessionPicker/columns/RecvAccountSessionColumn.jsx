import { FlexBox } from "shared-components";
import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const RecvAccountSessionColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={8} {...rest}>
				<FlexBox justifyContent="flex-end">
					{children}
				</FlexBox>
			</OptionGridColumn>
		);
	})
);

RecvAccountSessionColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

RecvAccountSessionColumn.displayName = "RecvAccountSessionColumn";
