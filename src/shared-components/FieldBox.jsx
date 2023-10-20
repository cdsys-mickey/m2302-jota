import Colors from "constants/Colors";

const { Box } = require("@mui/material");

const FieldBox = ({ children, sx = [], ...rest }) => {
	return (
		<Box
			// p={1}
			sx={[
				(theme) => ({
					borderColor: "divider",
					borderWidth: "1px",
					borderStyle: "solid",
					borderRadius: "4px",
					bgcolor: "#fff",
					padding: "8px",
					"&:hover": {
						borderColor: "#000",
						borderWidth: "2px",
						padding: "7px",
					},
					"&:focus-within": {
						borderColor: theme.palette.primary.main,
						borderWidth: "2px",
						padding: "7px",
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Box>
	);
};

export default FieldBox;
