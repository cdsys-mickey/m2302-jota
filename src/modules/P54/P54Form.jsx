import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import CmsCatPicker from "@/components/CmsCatPicker/CmsCatPicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import { TextFieldEx } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import P54OrderTypePicker from "./pickers/P54OrderTypePicker";
import P54ReportTypePicker from "./pickers/P54ReportTypePicker";

const P54Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="消費日期"
									leftComponent={<DatePickerWrapper
										name="SDate"
										label="交易"
										fullWidth
										validate
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
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<CmsCatPicker
									name="AsType"
									label="報表類別"
									fullWidth
									// forId
									// onChange={onTourGuideChange}
									disableOpenOnInput
									placeholder="1=旅行社,2=車行,3=導遊,<空白>=三者"
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
								<RangeGroup legend="車行區間"
									leftComponent={<CmsBusCompPicker
										name="SCarID"
										fullWidth
										borderless
										// forId
										// onChange={onBusCompChange}
										disableOpenOnInput
									/>}
									rightComponent={<CmsBusCompPicker
										name="ECarID"
										fullWidth
										borderless
										// forId
										// onChange={onBusCompChange}
										disableOpenOnInput
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="導遊區間"
									leftComponent={<TourGuidePicker
										name="SCndID"
										fullWidth
										borderless
										// forId
										// onChange={onTourGuideChange}
										disableOpenOnInput
									/>}
									rightComponent={<TourGuidePicker
										name="ECndID"
										fullWidth
										borderless
										// forId
										// onChange={onTourGuideChange}
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
										<Typography variant="body2">方計算回饋金</Typography>
									</FlexBox>

								</FlexBox>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P54ReportTypePicker
									label="報表型態"
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P54OrderTypePicker
									name="DtlType"
									label="明細型態"
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

P54Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P54Form.displayName = "P54Form";
export default P54Form;








