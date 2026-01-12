import { FrameBanner, FrameBox } from "@/shared-components";
import AlertEx from "@/shared-components/AlertEx";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import G10GridContainer from "./G10GridContainer";
import G10Toolbar from "./G10Toolbar";

const G10Frame = memo(() => {
	const form = useForm();

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<FormProvider {...form}>
					<form>
						<G10Toolbar />
						<ContainerEx maxWidth="lg" alignLeft>
							<AlertEx label="說明" severity="info" transparent >請在單號欄位輸入「銷貨單號(S)」或「銷退單號(R)」再執行沖銷</AlertEx>
						</ContainerEx>
						{/* <G10ListFormContainer /> */}
						<G10GridContainer />
					</form>
				</FormProvider>

			</Box>
		</FrameBox>
	);
});

G10Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

G10Frame.displayName = "G10Frame";
export default G10Frame;





