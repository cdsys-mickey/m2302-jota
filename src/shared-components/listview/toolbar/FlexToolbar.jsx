import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { forwardRef, memo } from "react";

const FlexToolbar = memo(
	forwardRef((props, ref) => {
		const {
			children,
			leftComponents,
			LeftComponent,
			RightComponent,
			rightComponents,
			componentProps = {},
			LeftProps,
			RightProps,
			// Styles
			boxSx = [],
			bgcolor,
			borderRadius,
			...rest
		} = props;

		const hasLeft = useMemo(() => {
			return LeftComponent || leftComponents;
		}, [LeftComponent, leftComponents]);

		const hasRight = useMemo(() => {
			return RightComponent || rightComponents;
		}, [RightComponent, rightComponents]);

		return (
			<FlexBox
				ref={ref}
				inline
				fullWidth
				alignItems="flex-end"
				pb={0.5}
				{...LeftProps}
				sx={[
					(theme) => ({
						minHeight: "48px",
						...(bgcolor && {
							backgroundColor: bgcolor,
						}),
						...(borderRadius && {
							borderRadius,
						}),
						// "& button, & label, & .MuiBox-root": {
						// 	marginRight: theme.spacing(0.5),
						// },
					}),
					...(Array.isArray(boxSx) ? boxSx : [boxSx]),
				]}
				{...rest}>
				{/* LEFT */}
				<FlexBox
					pr={1}
					alignItems="center"
					justifyContent="flex-start"
					flex={1}
					sx={[
						(theme) => ({
							"& button, & label, & .button": {
								marginRight: theme.spacing(0.5),
							},
						}),
					]}
					{...LeftProps}>
					{LeftComponent && <LeftComponent {...componentProps} />}
					{leftComponents}
					{children}
				</FlexBox>

				{/* RIGHT */}
				<FlexBox
					pl={1}
					alignItems="center"
					justifyContent="flex-end"
					{...(!hasLeft && {
						flex: 1,
					})}
					sx={[
						(theme) => ({
							"& button, & label, & .button": {
								marginLeft: theme.spacing(0.5),
							},
						}),
					]}
					{...RightProps}>
					{RightComponent && <RightComponent {...componentProps} />}
					{rightComponents}
				</FlexBox>
			</FlexBox>
		);
	})
);

FlexToolbar.displayName = "FlexToolbar";
FlexToolbar.propTypes = {
	bgcolor: PropTypes.string,
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.element,
	leftComponents: PropTypes.element,
	LeftComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	RightComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	rightComponents: PropTypes.element,
	componentProps: PropTypes.object,
	LeftProps: PropTypes.object,
	RightProps: PropTypes.object,
	boxSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default FlexToolbar;