import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const InlineListViewToolbar = memo(
	forwardRef((props, ref) => {
		const {
			leftComponent,
			rightComponent,
			boxSx = [],
			componentProps = {},
			...rest
		} = props;
		const LeftComponent = leftComponent;
		const RightComponent = rightComponent;
		return (
			<FlexBox
				ref={ref}
				inline
				fullWidth
				alignItems="flex-end"
				sx={[
					{
						minHeight: "48px",
					},
					...(Array.isArray(boxSx) ? boxSx : [boxSx]),
				]}
				{...rest}>
				{LeftComponent && (
					<FlexBox flex={1} justifyContent="flex-start">
						<LeftComponent {...componentProps} />
					</FlexBox>
				)}

				{RightComponent && (
					<FlexBox
						{...(!LeftComponent && {
							flex: 1,
						})}
						justifyContent="flex-end">
						<RightComponent {...componentProps} />
					</FlexBox>
				)}
			</FlexBox>
		);
	})
);

InlineListViewToolbar.displayName = "InlineListViewToolbar";
InlineListViewToolbar.propTypes = {
	leftComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	rightComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	componentProps: PropTypes.object,
	boxSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default InlineListViewToolbar;
