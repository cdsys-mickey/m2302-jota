import { Box, ButtonGroup, Grid, Paper } from "@mui/material";
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
import { useMemo } from "react";
import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";

export const A22GridToolbarFormContainer = () => {
	const form = useForm({
		defaultValues: {
			outputType: TxtExport.findById(TxtExport.OutputModes.HTML),
		},
	});
	const a22 = useContext(A22Context);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a22.onDebugSubmit,
		)
	}, [a22.onDebugSubmit, form]);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a22.onGenReportSubmit,
			a22.onGenReportSubmitError
		);
	}, [a22, form])

	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<FormProvider {...form}>
			<form>
				<FlexBox component={Paper} my={1} py={0.8} px={1}>
					<Grid container spacing={1}>
						<FlexGrid alignItems="center" item xs={3} >
							<A22GridLockRowsSwitchContainer />
						</FlexGrid>

						<FlexGrid
							item
							xs={9}
							alignItems="center"
							justifyContent="flex-end">
							<Box mr={0.5}>
								{/* <A22OutputModePickerContainer dense width="10rem" disableClearable /> */}
							</Box>
							<Box ml={0.5}>
								{/* <ButtonGroup>
									<DebugDialogButtonContainer onClick={onDebugSubmit} />
									<A22GenReportButtonContainer />
								</ButtonGroup> */}
								<FlexBox justifyContent="flex-end">
									<PrintButtonContainer
										color="primary"
										variant="contained"
										onSubmit={handleSubmit}
										onDebugSubmit={onDebugSubmit}
									/>
								</FlexBox>
							</Box>
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
