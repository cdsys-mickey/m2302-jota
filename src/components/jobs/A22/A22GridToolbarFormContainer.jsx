import { Box, Grid, Paper } from "@mui/material";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { A22Context } from "../../../contexts/A22/A22Context";
import TxtExport from "../../../modules/md-txt-export";
import FlexBox from "../../../shared-components/FlexBox";
import FlexGrid from "../../../shared-components/FlexGrid";
import { A22GenReportButtonContainer } from "./A22GenReportButtonContainer";
import { A22GridCancelEditButtonContainer } from "./A22GridCancelEditButtonContainer";
import { A22OutputModePickerContainer } from "./A22OutputModePickerContainer";
import { A22GridLockRowsSwitchContainer } from "./A22GridLockRowsSwitchContainer";

export const A22GridToolbarFormContainer = () => {
	const form = useForm({
		defaultValues: {
			outputType: TxtExport.findById(TxtExport.OutputModes.HTML),
		},
	});
	const a22 = useContext(A22Context);

	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<FormProvider {...form}>
			<form>
				<FlexBox component={Paper} my={1} py={0.7} px={1}>
					<Grid container spacing={1}>
						<Grid item xs={8}>
							<A22GridLockRowsSwitchContainer />
						</Grid>
						<Grid item xs={2}>
							<A22OutputModePickerContainer />
							{/* <StdPrintOutputModePicker
								required
								name="outputType"
								label="執行方式" 
							/>*/}
						</Grid>
						<FlexGrid
							item
							xs={2}
							alignItems="center"
							justifyContent="flex-end">
							<A22GenReportButtonContainer />
							<Box ml={0.5}>
								<A22GridCancelEditButtonContainer />
							</Box>
						</FlexGrid>
					</Grid>
				</FlexBox>
			</form>
		</FormProvider>
	);
};

A22GridToolbarFormContainer.displayName = "A22GridToolbarFormContainer";
