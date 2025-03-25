import { PrintReportButton } from "@/components";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import ContainerEx from "@/shared-components/ContainerEx";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import F04DataTypePicker from "./picker/F04DataTypePicker";

const F04Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<DatePickerWrapper
									label="電腦帳產生日期"
									// inline
									typo
									name="ActDate"
									editing={false}
								/>
								{/* <TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="ActDate"
									label="電腦帳產生日期"
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
								/> */}
							</Grid>

							<Grid item xs={12} sm={12}>
								<F04DataTypePicker
									name="PrtType"
									label="報表型態"
									required
									rules={{
										required: "報表型態為必填"
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<CheckboxExWrapper
									label="是否要盤點清單編號"
									name="PrtID"
									defaultValue={true}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="PhyIDs"
									label="清單"
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
									// onClick={f04.handleSubmit}
									>
										執行
									</ButtonWrapper>
								</ButtonGroup>
							</FlexToolbar> */}
							<Grid item xs={12}>
								<FlexBox justifyContent="flex-end">
									<PrintReportButton
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

F04Form.propTypes = {
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

F04Form.displayName = "F04Form";
export default F04Form;

