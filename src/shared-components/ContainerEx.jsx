import { Container, styled } from "@mui/material";

const ContainerEx = styled(Container, {
	shouldForwardProp: (prop) =>
		!`alignLeft`
			// .trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(({ theme, alignLeft = false }) => ({
	...(alignLeft && {
		marginLeft: 0,
	}),
}));

export default ContainerEx;
