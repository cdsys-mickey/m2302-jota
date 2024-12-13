import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const F04FormButtonsContainer = () => {
	console.log("rendering F04FormButtonsContainer");
	// const f04 = useContext(F04Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
			// onClick={f04.handleSubmit}
			>
				執行
			</ResponsiveButton>
		</>
	);
};

F04FormButtonsContainer.displayName = "F04FormButtonsContainer";

