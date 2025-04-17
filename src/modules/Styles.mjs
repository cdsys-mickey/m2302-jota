/* eslint-disable no-mixed-spaces-and-tabs */
const GRID_BOTTOM_TOOLBAR_HEIGHT = 48;

const ofHomeBox = ({ theme, drawerOpen }) => ({
	paddingTop: theme.spacing(1),
	...(drawerOpen
		? {
				paddingLeft: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "40px",
				},
				paddingRight: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "40px",
				},
		  }
		: {
				paddingLeft: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "40px",
				},
				paddingRight: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "40px",
				},
		  }),
});

const ofFrameBox = ({ theme, drawerOpen }) => ({
	paddingTop: theme.spacing(1),
	...(drawerOpen
		? {
				paddingLeft: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "20px",
				},
				paddingRight: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "20px",
				},
		  }
		: {
				paddingLeft: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "20px",
				},
				paddingRight: {
					xl: "60px",
					lg: "50px",
					md: "40px",
					sm: "30px",
					xs: "20px",
				},
		  }),
});

const ofGridBottomToolbar = () => ({
	my: 0,
	pr: 2.5,
	minHeight: GRID_BOTTOM_TOOLBAR_HEIGHT,
});

const Styles = {
	ofFrameBox,
	ofHomeBox,
	ofGridBottomToolbar,
	GRID_BOTTOM_TOOLBAR_HEIGHT,
};

export default Styles;
