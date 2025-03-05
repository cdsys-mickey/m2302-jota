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
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import U05DataTypePicker from "./picker/U05DataTypePicker";
import RangeGroup from "@/shared-components/RangeGroup";
import FlexBox from "@/shared-components/FlexBox";
import PrintButtonContainer from "@/components/print-button/PrintButtonContainer";

const U05Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
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
								<U05DataTypePicker
									name="RptType"
									label="資料型態"
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
						<FlexBox mt={1.5}>
							<Grid container>
								<Grid item xs={12} sm={12}>
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

						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

U05Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U05Form.displayName = "U05Form";
export default U05Form;


