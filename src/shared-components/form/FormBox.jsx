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
	"& .MuiFormControl-root:has(.MuiInputBase-root.Mui-disabled, .MuiInputBase-root.Mui-readOnly):not(.dsg-container *)": {
		// backgroundColor: "rgba(0, 0, 0, 0.05)"
	},
	"& .field-group-legend": {
		fontSize: "0.875rem",
		fontWeight: 600,
		left: "-2px",
	},
	// 排除 variant="filled"
	"& fieldset.field-group": {
		// backgroundColor: "rgb(255,255,255)",
		// backgroundColor: "initial",
	},
	"& .field-group .MuiInputBase-root.MuiFilledInput-root.Mui-disabled": {
		backgroundColor: "transparent"
	},
	"& .MuiInputBase-root:not(.MuiFilledInput-root):not(.dsg-container *):not(.Mui-readOnly):not(.Mui-disabled)": {
		backgroundColor: "rgb(255,255,255)",
	},
	// "& .MuiFormControl-root:not(.MuiInputBase-root.Mui-disabled, .MuiInputBase-root.Mui-readOnly)": {
	// 	backgroundColor: "rgb(255,255,255)"
	// },
	"& .dsg-container .MuiInputBase-root": {
		// backgroundColor: "rgb(255,255,255)",
		backgroundColor: "initial",
	},
}));

export default FormBox;
