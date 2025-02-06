import { Container, styled } from "@mui/material";

const ContainerEx = styled(Container, {
	shouldForwardProp: (prop) => !["alignLeft"].includes(prop),
})(({ alignLeft = false }) => ({
	...(alignLeft && {
		"&": {
			marginLeft: 0,
			paddingLeft: 0,
		},
		"& .MuiPaper-root": {
			justifyContent: "flex-start"
		}
	}),
}));
ContainerEx.displayName = "ContainerEx";
export default ContainerEx;
