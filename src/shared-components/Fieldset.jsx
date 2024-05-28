import { FormLabel } from "@mui/material";
import { Box, styled } from "@mui/system";
import PropTypes from "prop-types";

const getFontSize = ({ labelSize }) => {
	switch (labelSize) {
		case "large":
			return "1.2rem";
		case "medium":
			return "1rem";
		case "small":
		default:
			return "0.8rem";
	}
};

const FieldsetBox = styled(Box, {
	shouldForwardProp: (prop) => !["labelSize"].includes(prop),
})(({ theme, labelSize = "small" }) => {
	const fontSize = getFontSize({ labelSize });
	return {
		margin: 0,
		borderWidth: 1,
		borderColor: "#bebebe",
		borderStyle: "solid",
		borderRadius: theme.shape.borderRadius,
		"& .fieldset-legend": {
			fontSize: fontSize,
			paddingLeft: "0.5em",
			paddingRight: "0.5em",
		},
	};
});

const Fieldset = ({
	label,
	children,
	labelProps,
	labelStyles = [],
	sx = [],
	...rest
}) => {
	return (
		<FieldsetBox
			component="fieldset"
			sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
			{...rest}>
			{label && (
				<FormLabel
					component="legend"
					className="fieldset-legend"
					sx={[
						...(Array.isArray(labelStyles)
							? labelStyles
							: [labelStyles]),
					]}
					{...labelProps}>
					{label}
				</FormLabel>
			)}

			{children}
		</FieldsetBox>
	);
};
Fieldset.propTypes = {
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	labelProps: PropTypes.object,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	labelStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default Fieldset;
