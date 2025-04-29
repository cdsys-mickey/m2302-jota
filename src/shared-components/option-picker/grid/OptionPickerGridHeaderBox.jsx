import { Box, styled } from "@mui/material";

const OptionPickerGridHeaderBox = styled(Box, {
	shouldForwardProp: (prop) => ![].includes(prop)
})(({ theme }) => ({
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
}));

export default OptionPickerGridHeaderBox;