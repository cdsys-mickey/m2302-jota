import Colors from "constants/Colors";

const { Box } = require("@mui/material");

const GovDocFieldBox = ({ children, sx = [], readOnly, ...rest }) => {
	return (
		<Box
			// p={1}
			sx={[
				(theme) => ({
					borderColor: "divider",
					borderWidth: "1px",
					borderStyle: "solid",
					// borderBottomLeftRadius: "4px",
					// borderBottomRightRadius: "4px",
					borderRadius: "4px",
					bgcolor: "#fff",
					padding: "1px",
					...(!readOnly && {
						"&:hover": {
							borderColor: "#000",
							borderWidth: "2px",
							padding: "0",
						},
					}),
					"&:focus-within": {
						borderColor: theme.palette.primary.main,
						borderWidth: "2px",
						padding: "0",
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Box>
	);
};

export default GovDocFieldBox;
