import { Box, styled } from "@mui/material";

const FormBox = styled(Box, {
	shouldForwardProp: (prop) => ![].includes(prop),
})(() => ({
	"& .MuiInputLabel-root": {
		fontSize: "105%",
	},
	"& .MuiInputLabel-shrink": {
		fontSize: "110%",
		fontWeight: 600,
		left: "-2px",
	},
	"& .MuiInputBase-root": {
		backgroundColor: "rgb(255,255,255)",
	},
	"& .dsg-container .MuiInputBase-root": {
		backgroundColor: "initial",
	},
}));

export default FormBox;
