import { Box, styled } from "@mui/material";

/**
 * 讓其下的 UI 元件可以有一致的 L&F
 */
const FormBox = styled(Box, {
	shouldForwardProp: (prop) => ![].includes(prop),
})(() => ({
	"& .MuiInputLabel-root": {
		fontSize: "105%",
	},
	"& .MuiInputLabel-shrink": {
		fontSize: "115%",
		// fontSize: "1.15rem",
		fontWeight: 600,
		left: "-2px",
	},
	"& .field-group-legend": {
		fontSize: "0.875rem",
		fontWeight: 600,
		left: "-2px",
	},
	// 排除 variant="filled"
	"& fieldset.field-group": {
		backgroundColor: "rgb(255,255,255)",
		// backgroundColor: "initial",
	},
	"& .MuiInputBase-root:not(.MuiFilledInput-root):not(.dsg-container *)": {
		backgroundColor: "rgb(255,255,255)",
		// backgroundColor: "initial",
	},
	"& .dsg-container .MuiInputBase-root": {
		// backgroundColor: "rgb(255,255,255)",
		backgroundColor: "initial",
	},
}));

export default FormBox;
