import { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useMemo } from "react";

const TypographyExBase = memo((props) => {
	const { children, emptyText, color, ...rest } = props;

	const useEmptyText = useMemo(() => {
		return !children && !!emptyText;
	}, [children, emptyText]);

	const _color = useMemo(() => {
		return (!color && useEmptyText) ? "text.secondary" : color;
	}, [color, useEmptyText])

	const _children = useMemo(() => {
		return useEmptyText ? emptyText : children;
	}, [children, emptyText, useEmptyText])

	return (
		<Typography color={_color} {...rest}>
			{_children}
		</Typography>
	);
})

TypographyExBase.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	emptyText: PropTypes.string,
	color: PropTypes.string,
}

TypographyExBase.displayName = "TypographyExBase";
export default TypographyExBase;