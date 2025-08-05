import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import { CmsEntryPicker } from "@/components/CmsEntryPicker/CmsEntryPicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import { CheckboxEx, TextFieldEx } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import P61ReportTypePicker from "./pickers/P61ReportTypePicker";
import CmsCatPicker from "@/components/CmsCatPicker/CmsCatPicker";
import P61RptClassPicker from "./pickers/P61RptClassPicker";
import P61OrderTypePicker from "./pickers/P61OrderTypePicker";

const P61Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期" required
									leftComponent={<DatePickerWrapper
										name="SDate"
										label="交易"
										fullWidth
										validate
										required
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label="日期區間迄"
										fullWidth
										validate
										required
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="旅行社區間"
									leftComponent={<TourGroupPicker
										name="STrvID"
										label="旅行社代號"
										fullWidth
										borderless
										// forId
										// onChange={onTourGroupChange}
										disableOpenOnInput
									/>}
									rightComponent={<TourGroupPicker
										name="ETrvID"
										label="旅行社代號"
										fullWidth
										borderless
										// forId
										// onChange={onTourGroupChange}
										disableOpenOnInput
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<FlexBox inline >
									<FlexBox>
										<TextFieldEx
											label="單筆消費達(≧)"
											name="ChkAmt"
											size="small"
											fullWidth
											type="number"
											endAdornment="元"
										/>
									</FlexBox>
									<FlexBox px={1} pb={1} alignItems="flex-end">
										<Typography variant="body2">方計算回饋金(獎勵金1)</Typography>
									</FlexBox>

								</FlexBox>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P61RptClassPicker
									name="RptClass"
									label="報表類別"
									fullWidth
									// forId
									// onChange={onTourGuideChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P61ReportTypePicker
									label="報表型態"
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P61OrderTypePicker
									label="明細型態"
									name="DtlType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="center">
										<StdPrintOutputModePicker
											required
											name="outputType"
											label="執行方式"
										/>
									</FlexBox> */}
								</Grid>
								<Grid item xs={12} sm={6}>
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
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

P61Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P61Form.displayName = "P61Form";
export default P61Form;








