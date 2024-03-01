import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const InlineListViewToolbar = memo(
	forwardRef((props, ref) => {
		const {
			children,
			leftComponents,
			LeftComponent,
			RightComponent,
			rightComponents,
			boxSx = [],
			componentProps = {},
			...rest
		} = props;

		return (
			<FlexBox
				ref={ref}
				inline
				fullWidth
				alignItems="flex-end"
				pb={0.5}
				sx={[
					{
						minHeight: "48px",
					},
					...(Array.isArray(boxSx) ? boxSx : [boxSx]),
				]}
				{...rest}>
				<FlexBox
					flex={1}
					alignItems="center"
					justifyContent="flex-start">
					{LeftComponent && <LeftComponent {...componentProps} />}
					{leftComponents}
				</FlexBox>

				{children}

				<FlexBox
					{...(!LeftComponent && {
						flex: 1,
					})}
					alignItems="center"
					justifyContent="flex-end">
					{RightComponent && <RightComponent {...componentProps} />}
					{rightComponents}
				</FlexBox>
			</FlexBox>
		);
	})
);

InlineListViewToolbar.displayName = "InlineListViewToolbar";
InlineListViewToolbar.propTypes = {
	children: PropTypes.element,
	leftComponents: PropTypes.element,
	LeftComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	RightComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	rightComponents: PropTypes.element,
	componentProps: PropTypes.object,
	boxSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default InlineListViewToolbar;
