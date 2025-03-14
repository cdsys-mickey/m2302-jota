import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import AccountingEntryListingPicker from "@/components/picker/AccountingEntryListingPicker";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import F06DataTypePicker from "./picker/F06DataTypePicker";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import FlexBox from "@/shared-components/FlexBox";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";

const F06Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<AccountingEntryListingPicker
									label="盤點作帳日期"
									name="accEntry"
									autoFocus
									required
									rules={{
										required: "盤點作帳日期為必填"
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<F06DataTypePicker
									name="PrtType"
									label="報表型態"
									required
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12}>
								<TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="PhyIDs"
									label="盤點清單"
									// inline
									required
									readOnly
									slotProps={{
										"label": {
											sx: {
												marginTop: "-8px",
												marginLeft: "4px"
											}
										}
									}}
								/>
							</Grid>

							{/* <Grid item xs={12}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid> */}

							{/* <FlexToolbar align="right">
								<ButtonGroup>
									<DebugDialogButtonContainer onClick={onDebugSubmit} />
									<ButtonWrapper
										responsive
										startIcon={<OpenInNewIcon />}
										variant="contained"
										color="primary"
										type="submit"
									>
										執行
									</ButtonWrapper>
								</ButtonGroup>
							</FlexToolbar> */}
							<Grid item xs={12}>
								<FlexBox justifyContent="flex-end">
									<PrintButtonContainer
										color="primary"
										variant="contained"
										onSubmit={onSubmit}
										onDebugSubmit={onDebugSubmit}
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

F06Form.propTypes = {
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

F06Form.displayName = "F06Form";
export default F06Form;

