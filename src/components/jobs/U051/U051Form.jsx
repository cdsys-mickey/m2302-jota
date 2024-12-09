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
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import TerminalPicker from "@/components/terminal-picker/TerminalPicker";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { TimePickerWrapper } from "@/shared-components/time-picker/TimePickerWrapper";
import U051DataTypePicker from "./picker/U051DataTypePicker";

const U051Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<DatePickerWrapper
									name="SDate"
									label="交易日期起"
									fullWidth
									validate
									clearable
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<DatePickerWrapper
									name="EDate"
									label="交易日期迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<U051DataTypePicker
									name="RptType"
									label="報表類型"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid>
						</Grid>
						<Grid container>
							<FlexGrid item xs={12} sm={12} alignItems="center">
								{/* <CheckboxExWrapper
									label="含撥出入"
									name="transIncluded"
									defaultValue={true}
								/> */}
							</FlexGrid>
							<Grid item xs={12} sm={12}>
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

U051Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U051Form.displayName = "U051Form";
export default U051Form;



