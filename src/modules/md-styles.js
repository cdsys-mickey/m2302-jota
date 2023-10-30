const ofHomeBox = ({ theme, drawerOpen }) => ({
	paddingTop: "30px",
	// transition: theme.transitions.create("paddingRight", {
	// 	easing: theme.transitions.easing.sharp,
	// 	duration: theme.transitions.duration.enteringScreen,
	// }),
	...(drawerOpen && {
		paddingLeft: {
			xl: "40px",
			lg: "24px",
			md: "16px",
			sm: "0px",
			xs: "0px",
		},
	}),
	...(!drawerOpen && {
		paddingLeft: {
			xl: "60px",
			lg: "40px",
			md: "40px",
			sm: "20px",
			xs: "0px",
		},
	}),
	...(drawerOpen && {
		paddingRight: {
			xl: "40px",
			lg: "24px",
			md: "16px",
			sm: "0px",
			xs: "0px",
		},
	}),
	...(!drawerOpen && {
		paddingRight: {
			xl: "60px",
			lg: "40px",
			md: "40px",
			sm: "20px",
			xs: "0px",
		},
	}),
});

const ofFrameBox = ({ theme, drawerOpen }) => ({
	paddingTop: "30px",
	// transition: theme.transitions.create("paddingRight", {
	// 	easing: theme.transitions.easing.sharp,
	// 	duration: theme.transitions.duration.enteringScreen,
	// }),
	...(drawerOpen && {
		paddingLeft: {
			xl: "40px",
			lg: "16px",
			md: "16px",
			sm: "0px",
			xs: "0px",
		},
	}),
	...(!drawerOpen && {
		paddingLeft: {
			xl: "60px",
			lg: "40px",
			md: "40px",
			sm: "20px",
			xs: "0px",
		},
	}),
	...(drawerOpen && {
		paddingRight: {
			xl: "40px",
			lg: "16px",
			md: "16px",
			sm: "0px",
			xs: "0px",
		},
	}),
	...(!drawerOpen && {
		paddingRight: {
			xl: "60px",
			lg: "40px",
			md: "40px",
			sm: "20px",
			xs: "0px",
		},
	}),
});

const Styles = {
	ofFrameBox,
	ofHomeBox,
};

export default Styles;
