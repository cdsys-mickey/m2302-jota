import { Backdrop, CircularProgress } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";

const LoadingBackdrop = memo(
	({ children, open = false, invisible = false, ...rest }) => {
		return (
			<Backdrop
				sx={(theme) => ({
					zIndex: theme.zIndex.drawer + 1,
					color: "#fff",
				})}
				open={open}
				invisible={invisible}
				{...rest}>
				{!invisible && (
					<CircularProgress
						color="inherit"
						sx={{ marginRight: "1rem" }}
					/>
				)}

				{children}
			</Backdrop>
		);
	}
);

LoadingBackdrop.displayName = "LoadingBackdrop";
LoadingBackdrop.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	open: PropTypes.bool,
	invisible: PropTypes.bool,
};
export default LoadingBackdrop;
