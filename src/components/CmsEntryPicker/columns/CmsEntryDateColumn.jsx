import { OptionGridColumn } from "@/shared-components/option-picker/grid/OptionGridColumn";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const CmsEntryDateColumn = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<OptionGridColumn ref={ref} xs={24} sm={3.5} {...rest}>
				{children}
			</OptionGridColumn>
		);
	})
);

CmsEntryDateColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

CmsEntryDateColumn.displayName = "CmsEntryDateColumn";
