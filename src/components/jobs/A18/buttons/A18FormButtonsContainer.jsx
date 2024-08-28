import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const A18FormButtonsContainer = () => {
	console.log("rendering A18FormButtonsContainer");
	// const a18 = useContext(A18Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
			// onClick={a18.handleSubmit}
			>
				執行
			</ResponsiveButton>
		</>
	);
};

A18FormButtonsContainer.displayName = "A18FormButtonsContainer";
