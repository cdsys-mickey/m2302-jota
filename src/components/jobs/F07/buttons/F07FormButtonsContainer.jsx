import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const F07FormButtonsContainer = () => {
	console.log("rendering F07FormButtonsContainer");
	// const f07 = useContext(F07Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
			// onClick={f07.handleSubmit}
			>
				執行
			</ResponsiveButton>
		</>
	);
};

F07FormButtonsContainer.displayName = "F07FormButtonsContainer";

