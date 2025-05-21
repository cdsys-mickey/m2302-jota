import { amber } from "@mui/material/colors";

const STYLES = Object.freeze({
	ELLIPSIS: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		wordBreak: "break-all",
	},
	ELLIPSIS_BOX: {
		overflow: "hidden",
	},
	LISTVIEW_OFFTOP_SHADOW: {
		boxShadow: "inset 0px 8px 8px -5px rgb(0 0 0 / 30%)",
	},
	PAPER_OFFTOP_SHADOW: {
		boxShadow:
			"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0px 8px 8px -5px rgb(0 0 0 / 30%)",
	},
	BOX_SHADOW_TRANSITION: {
		transition: "box-shadow 0.3s",
	},
	ONE_LINER: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	DEFAULT_FORM_LABEL_STYLES: {
		"& .MuiTypography-root": {
			fontWeight: 600,
		},
	},
	FORM_LABEL_STYLES_NOWRAP: {
		"& .MuiFormLabel-root ": {
			whiteSpace: "nowrap",
		},
		"& .MuiTypography-root": {
			fontWeight: 600,
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			overflow: "hidden",
		},
	},
	DEFAULT_INPUT_LABEL_PROPS: {
		shrink: true,
	},
	DEFAULT_OPTION_PICKER_INPUT_LABEL_PROPS: {
		shrink: true,
	},
	BACKDROP_TRANSPARENT: {
		backgroundColor: "transparent", // 設置背景為透明
	},
	OUT_BOX_SHADOW:
		"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
	OUT_BOX_SHADOW_H:
		"-2px 0px 1px -1px rgba(0,0,0,0.2), 2px 0px 1px -1px rgba(0,0,0,0.2), -1px 0px 1px 0px rgba(0,0,0,0.14) , 1px 0px 1px 0px rgba(0,0,0,0.14), -1px 0px 3px 0px rgba(0,0,0,0.12), 1px 0px 3px 0px rgba(0,0,0,0.12)",
	IN_BOX_SHADOW:
		"inset 0px 2px 1px -1px rgba(0,0,0,0.2), inset 0px 1px 1px 0px rgba(0,0,0,0.14), inset 0px 1px 3px 0px rgba(0,0,0,0.12)",
});

const forColorButton = (theme, mainTone = amber) => ({
	"&": {
		color: theme.palette.getContrastText(mainTone[300]),
		backgroundColor: mainTone[300],
		"&:hover": {
			backgroundColor: mainTone[500],
		},
	},
});

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

const MuiStyles = {
	STYLES,
	...STYLES,
	forColorButton,
	ofFrameBox,
	ofHomeBox,
	ofGridBottomToolbar,
	GRID_BOTTOM_TOOLBAR_HEIGHT,
};

export default MuiStyles;
