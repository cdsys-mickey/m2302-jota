import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({
	children,
	open = false,
	invisible = false,
	...rest
}) => {
	return (
		<div>
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
		</div>
	);
};

export default LoadingBackdrop;
