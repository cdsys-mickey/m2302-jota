import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const F06FormButtonsContainer = () => {
	console.log("rendering F06FormButtonsContainer");
	// const f06 = useContext(F06Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
			// onClick={f06.handleSubmit}
			>
				執行
			</ResponsiveButton>
		</>
	);
};

F06FormButtonsContainer.displayName = "F06FormButtonsContainer";

