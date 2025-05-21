import F02GridContainer from "@/pages/jobs/F02/F02GridContainer";
import F02Toolbar from "@/pages/jobs/F02/F02Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import AlertEx from "@/shared-components/AlertEx";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { F02ListFormContainer } from "./F02ListFormContainer";

const F02Frame = memo(() => {
	const form = useForm();
	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<FormProvider {...form}>
					<form>
						<F02Toolbar />
						<F02ListFormContainer />
						<F02GridContainer />
					</form>
				</FormProvider>
				<ContainerEx maxWidth="xs" alignLeft>
					<AlertEx label="說明" severity="info" transparent >刪除電腦帳，並不會清除盤點數據。</AlertEx>
				</ContainerEx>
			</Box>
		</FrameBox>
	);
});

F02Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

F02Frame.displayName = "F02Frame";
export default F02Frame;


