import CrudContext from "@/contexts/crud/CrudContext";
import { useMediaQuery, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import DialogExView from "./DialogExView";

const DialogExContainer = (props) => {
	const { minWidth, ...rest } = props;
	const crud = useContext(CrudContext);
	const theme = useTheme();

	// 判斷 media query 條件
	const query = (() => {
		if (typeof minWidth === "string" && theme.breakpoints.keys.includes(minWidth)) {
			return theme.breakpoints.up(minWidth);
		}
		if (typeof minWidth === "number") {
			return `(min-width:${minWidth}px)`;
		}
		if (typeof minWidth === "string" && /^\d+px$/.test(minWidth)) {
			return `(min-width:${minWidth})`;
		}
		return "(min-width:0px)";
	})();


	const matchesBreakpoint = useMediaQuery(query);
	const tooSmall = !!minWidth && !matchesBreakpoint;

	return (
		<DialogExView
			disableEscapeKeyDown={crud?.editing}
			hideCloseButton={crud?.editing}
			tooSmall={tooSmall}
			// fullScreen={crud?.editing}
			{...rest}
		/>
	);
};
DialogExContainer.propTypes = {
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DialogExContainer.displayName = "DialogExContainer";
export default DialogExContainer;