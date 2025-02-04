import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import CounterPicker from "@/components/picker/CounterPicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import H10CalTypePicker from "./pickers/H10CalTypePicker";
import H10OrderTypePicker from "./pickers/H10OrderTypePicker";
import H10ReportTypePicker from "./pickers/H10ReportTypePicker";
import AreaPicker from "@/components/jobs/A06/form/fields/AreaPicker";
import ChannelPicker from "@/components/jobs/A06/form/fields/ChannelPicker";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";

const H10Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									autoFocus
									name="SDate1"
									label="日期區間(一)"
									fullWidth
									validate
									clearable
									required
									rules={{
										required: "日期區間為必填"
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate1"
									label="日期區間迄"
									fullWidth
									validate
									clearable
									required
									rules={{
										required: "日期區間為必填"
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate2"
									label="日期區間(二)"
									fullWidth
									validate
									clearable
									required
									rules={{
										required: "日期區間為必填"
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate2"
									label="日期區間迄"
									fullWidth
									validate
									clearable
									required
									rules={{
										required: "日期區間為必填"
									}}
								/>
							</Grid>
							{/* 區域 */}
							<Grid item xs={12} sm={6}>
								<AreaPicker
									name="SAreaID"
									label="客戶區域"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<AreaPicker
									name="EAreaID"
									label="截止區域"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							{/* 通路 */}
							<Grid item xs={12} sm={6}>
								<ChannelPicker
									name="SLineID"
									label="客戶通路"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ChannelPicker
									name="ELineID"
									label="截止通路"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6.5}>
								<SalesTypePicker
									name="SalType"
									label="零售"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldWrapper
									name="TopNo"
									label="每一區域/通路,僅列前幾名店家"
									type="number"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<H10ReportTypePicker
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>

						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={2}>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									<StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/>
								</FlexGrid>
								<Grid item xs={12} sm={6}>
									<FlexToolbar align="right">
										<ButtonGroup>
											<DebugDialogButtonContainer
												onClick={onDebugSubmit} />
											<ReportSubmitButtonContainer
												onClick={onSubmit} />
										</ButtonGroup>
									</FlexToolbar>
								</Grid>
							</Grid>
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

H10Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H10Form.displayName = "H10Form";
export default H10Form;





