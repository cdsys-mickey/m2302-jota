import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const F05FormButtonsContainer = () => {
	console.log("rendering F05FormButtonsContainer");
	// const f05 = useContext(F05Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
			// onClick={f05.handleSubmit}
			>
				執行
			</ResponsiveButton>
		</>
	);
};

F05FormButtonsContainer.displayName = "F05FormButtonsContainer";

