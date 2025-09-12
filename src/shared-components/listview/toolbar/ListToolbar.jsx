import FlexBox from "@/shared-components/FlexBox";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";

const ListToolbar = memo(
	forwardRef((props, ref) => {
		const {
			alignItems = "center",
			align = "left",
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
			minHeight = 37,
			borderRadius = 1,
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
				alignItems={alignItems}
				p={0.5}
				// my={0.5}
				sx={[
					(theme) => ({
						// minHeight: "48px",
						...(minHeight && {
							minHeight: minHeight,
						}),
						...(bgcolor && {
							backgroundColor: bgcolor,
						}),
						...(borderRadius && {
							borderRadius,
						}),
						"& .MuiInputBase-root": {
							// "& .MuiInputBase-root": {
							backgroundColor: "rgb(255,255,255)",
						},
						"& .MuiInputBase-root, .MuiButton-outlined": {
							// "& .MuiInputBase-root": {
							backgroundColor: "rgba(255,255,255, 0.8)",
						},
					}),
					...(Array.isArray(boxSx) ? boxSx : [boxSx]),
				]}
				{...rest}>
				{/* LEFT */}
				<FlexBox
					pr={1}
					alignItems="center"
					justifyContent="flex-start"
					// {...(!hasRight && {
					// 	flex: 1,
					// })}
					{...(!hasLeft && {
						flex: 0,
					})}
					sx={[
						(theme) => ({
							"gap": theme.spacing(0.5)
						}),
					]}
					{...LeftProps}>
					{LeftComponent && <LeftComponent {...componentProps} />}
					{leftComponents}
					{align === "left" && children}
				</FlexBox>

				{/* RIGHT */}
				<FlexBox
					pl={1}
					// pt={0}
					// pb={0}
					alignItems="center"
					justifyContent="flex-end"
					flex={1}
					{...(!hasRight && {
						flex: 0,
					})}
					sx={[
						(theme) => ({
							"gap": theme.spacing(0.5)
						}),
					]}
					{...RightProps}>
					{RightComponent && <RightComponent {...componentProps} />}
					{rightComponents}
					{align === "right" && children}
				</FlexBox>
			</FlexBox>
		);
	})
);

ListToolbar.displayName = "FlexToolbar";
ListToolbar.propTypes = {
	align: PropTypes.oneOf(["left", "right", "center"]),
	bgcolor: PropTypes.string,
	borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// children: PropTypes.element,
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

export default ListToolbar;
