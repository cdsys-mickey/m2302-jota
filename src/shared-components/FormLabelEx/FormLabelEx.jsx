import PropTypes from "prop-types";
import { FormLabel, Typography } from "@mui/material";
import { FlexBox } from "shared-components";
import { memo } from "react";
import { useMemo } from "react";

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

const FormLabelEx = memo((props) => {
	const {
		size = "small",
		IconComponent,
		inline,
		dense,
		children,
		variant = "subtitle2",
		slotProps,
		sx = [],
	} = props;

	const paddingUp = useMemo(() => {
		return dense && !inline;
	}, [dense, inline])

	return (
		<FormLabel
			sx={[
				(theme) => ({
					color: theme.palette.text.primary,
					// fontWeight: 400,
					...(paddingUp && {
						top: "-4px",
					}),
					marginRight: theme.spacing(1),
					"& .MuiTypography-root": {
						fontWeight: 600
					}
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
					<Typography variant={variant} {...slotProps?.typography}>{children}</Typography>
				</FlexBox>
			</FlexBox>
		</FormLabel>
	);
});

FormLabelEx.displayName = "FormLabelEx";

FormLabelEx.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	variant: PropTypes.string,
	dense: PropTypes.bool,
	inline: PropTypes.bool,
	slotProps: PropTypes.object,
	IconComponent: PropTypes.element
};

export default FormLabelEx;
