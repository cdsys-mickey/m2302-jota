import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import CmsCatPicker from "@/components/CmsCatPicker/CmsCatPicker";
import { CmsEntryPicker } from "@/components/CmsEntryPicker/CmsEntryPicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import { CheckboxExField, TextFieldEx } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import P52ReportTypePicker from "./pickers/P52ReportTypePicker";

const P52Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期"
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
								<RangeGroup legend="佣金單號"
									leftComponent={<CmsEntryPicker
										name="SComID"
										forId
										fullWidth
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<CmsEntryPicker
										name="EComID"
										forId
										fullWidth
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CmsBusCompPicker
									name="CarID"
									label="車行"
									fullWidth
									// forId
									// onChange={onBusCompChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TourGroupPicker
									name="TrvID"
									label="旅行社代號"
									fullWidth
									// forId
									// onChange={onTourGroupChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TourGuidePicker
									name="CndID"
									label="導遊代號"
									fullWidth
									// forId
									// onChange={onTourGuideChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldEx
									label="已領佣金"
									name="CmsAmt"
									size="small"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CmsCatPicker
									name="CmsType"
									label="佣金類別"
									fullWidth
									forId
									// onChange={onTourGuideChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P52ReportTypePicker
									label="資料型態"
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CheckboxExField
									label="列印簽名欄"
									name="Sign"
									defaultValue={true}
									variant="outlined"
									size="small"
									fullWidth
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

P52Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P52Form.displayName = "P52Form";
export default P52Form;







