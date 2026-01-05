import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CmsCityPicker from "@/components/CmsCityPicker/CmsCityPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import P58ReportTypePicker from "./pickers/P58ReportTypePicker";

const P58Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期" required
									leftComponent={<DatePickerWrapper
										minDate={"2026/01/01"}
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
										minDate={"2026/01/01"}
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
								<RangeGroup legend="縣市"
									leftComponent={<CmsCityPicker
										name="SCityID"
										borderless
									/>}
									rightComponent={<CmsCityPicker
										name="ECityID"
										borderless
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
							<Grid item xs={12} sm={6}>
								<P58ReportTypePicker
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={2}>
							<Grid container spacing={1}>
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

P58Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P58Form.displayName = "P58Form";
export default P58Form;








