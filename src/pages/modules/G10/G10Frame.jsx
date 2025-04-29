import AlertEx from "@/shared-components/AlertEx";
import ContainerEx from "@/shared-components/ContainerEx";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { G10ListFormContainer } from "./G10ListFormContainer";
import G10Toolbar from "./G10Toolbar";
import G10GridContainer from "./G10GridContainer";

const G10Frame = memo((props) => {
	const { boxStyles } = props;
	const form = useForm();
	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<FormProvider {...form}>
					<form>
						<G10Toolbar />
						<ContainerEx maxWidth="xs" alignLeft>
							<AlertEx label="說明" severity="info" transparent >請在單號欄位輸入「銷貨單號」或「銷退單號」再執行沖銷</AlertEx>
						</ContainerEx>
						{/* <G10ListFormContainer /> */}
						<G10GridContainer />
					</form>
				</FormProvider>

			</Box>
		</Box>
	);
});

G10Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

G10Frame.displayName = "G10Frame";
export default G10Frame;





