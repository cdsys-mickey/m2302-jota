import F02GridContainer from "@/components/jobs/F02/F02GridContainer";
import F02Toolbar from "@/components/jobs/F02/F02Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { F02ListFormContainer } from "./F02ListFormContainer";
import { FormProvider, useForm } from "react-hook-form";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import AlertEx from "@/shared-components/AlertEx";
import ContainerEx from "@/shared-components/ContainerEx";

const F02Frame = memo((props) => {
	const { boxStyles } = props;
	const form = useForm();
	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
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
		</Box>
	);
});

F02Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

F02Frame.displayName = "F02Frame";
export default F02Frame;


