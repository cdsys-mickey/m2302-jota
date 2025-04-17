import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import TerminalPicker from "@/components/terminal-picker/TerminalPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import RangeGroup from "@/shared-components/RangeGroup";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TimePickerWrapper } from "@/shared-components/time-picker/TimePickerWrapper";
import P02DataTypePicker from "./picker/P02DataTypePicker";

const P02Form = memo((props) => {
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
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="時段 (報表型態2,3有效)"
									leftComponent={<TimePickerWrapper
										name="STime"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<TimePickerWrapper
										name="ETime"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="收銀機號"
									leftComponent={<TerminalPicker
										name="SPosNo"
										label="收銀機號起"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<TerminalPicker
										name="EPosNo"
										label="收銀機號迄"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							{/* 條碼 */}
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="發票號碼 (報表型態2,3有效)"
									leftComponent={<TextFieldWrapper
										name="SInvID"
										label=""
										size="small"
										fullWidth
										borderless
										placeholder="起"
									/>}
									rightComponent={<TextFieldWrapper
										name="EInvID"
										label="發票號碼迄"
										size="small"
										fullWidth
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<FlexBox fullWidth />

							<Grid item xs={12} sm={6}>
								<P02DataTypePicker
									name="RptType"
									label="報表類型"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid>
						</Grid>
						<FlexBox mt={2}>
							<Grid container>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									{/* <CheckboxExWrapper
									label="包含撥出入"
									name="transIncluded"
									defaultValue={true}
								/> */}
								</FlexGrid>
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

P02Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P02Form.displayName = "P02Form";
export default P02Form;

