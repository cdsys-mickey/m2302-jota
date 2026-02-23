import { ExportTxtButton } from "@/components";
import { A22Context } from "@/contexts/A22/A22Context";
import TxtExport from "@/modules/md-txt-export";
import FlexGrid from "@/shared-components/FlexGrid";
import { Box, Grid, Paper } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { FlexBox } from "shared-components";
import { A22GridCancelEditButtonContainer } from "./A22GridCancelEditButtonContainer";
import { A22GridLockRowsSwitchContainer } from "./A22GridLockRowsSwitchContainer";

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

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

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
									<ExportTxtButton
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
