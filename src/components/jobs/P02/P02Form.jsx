import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import TerminalPicker from "@/components/terminal-picker/TerminalPicker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { TimePickerWrapper } from "@/shared-components/time-picker/TimePickerWrapper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import P02DataTypePicker from "./picker/P02DataTypePicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";

const P02Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate"
									label="交易日期起"
									fullWidth
									validate
									clearable
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="交易日期迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TimePickerWrapper
									name="STime"
									label="時段 (報表型態2,3有效)"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TimePickerWrapper
									name="ETime"
									label="時段迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TerminalPicker
									name="SPosNo"
									label="收銀機號起"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TerminalPicker
									name="EPosNo"
									label="收銀機號迄"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							{/* 條碼 */}
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									name="SInvID"
									label="發票號碼 (報表型態2,3有效)"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									name="EInvID"
									label="發票號碼迄"
									size="small"
									fullWidth
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
						<Grid container>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								{/* <CheckboxExWrapper
									label="包含撥出入"
									name="transIncluded"
									defaultValue={true}
								/> */}
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

