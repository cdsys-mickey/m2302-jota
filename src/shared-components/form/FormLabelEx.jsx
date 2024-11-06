import PropTypes from "prop-types";
import { FormLabel, Typography } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import { memo } from "react";

const iconProps = (size) => {
	switch (size) {
		case "sm":
			return {
				fontSize: "small",
			};
		case "md":
		default:
			return {
				fontSize: "medium",
			};
	}
};

export const FormLabelEx = memo((props) => {
	const {
		size = "small",
		IconComponent,
		children,
		variant = "subtitle2",
		sx = [],
	} = props;
	return (
		<FormLabel
			sx={[
				(theme) => ({
					color: theme.palette.text.primary,
					fontWeight: 400,
					marginRight: theme.spacing(1)
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			<FlexBox fullWidth inline>
				{IconComponent && (
					<FlexBox alignItems="center" mr={0.5}>
						<IconComponent {...iconProps(size)} />
					</FlexBox>
				)}
				<FlexBox alignItems="center" flex={1}>
					<Typography variant={variant}>{children}</Typography>
				</FlexBox>
			</FlexBox>
		</FormLabel>
	);
});

FormLabelEx.displayName = "FormLabelEx";

FormLabelEx.propTypes = {
	children: PropTypes.node,
};

export default FormLabelEx;
