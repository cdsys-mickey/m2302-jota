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
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import Auth from "@/modules/md-auth";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import U061DataTypePicker from "./picker/U061DataTypePicker";

const U061Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<AppDeptPicker
									autoFocus
									label="門市代碼"
									name="SDeptID"
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate"
									label="交易日期起"
									fullWidth
									validate
									clearable
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
								<U061DataTypePicker
									name="RptType"
									label="報表型態"
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
									label="含撥出入"
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

U061Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U061Form.displayName = "U061Form";
export default U061Form;




