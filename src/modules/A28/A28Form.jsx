import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import { TextFieldEx } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import A28OrderTypePicker from "./pickers/A28OrderTypePicker";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import Auth from "../Auth.mjs";

const A28Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12}>
								<AppDeptPicker
									filterByOperator
									label="查詢門市"
									name="dept"
									disableOpenOnInput
									selectOnFocus
									// disabled={deptDisabled}
									scope={Auth.SCOPES.BRANCH_HQ}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="登入日期"
									leftComponent={<DatePickerWrapper name="SDate"
										fullWidth
										validate
										clearable
										// autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper name="EDate"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldEx
									label="登入代碼"
									name="LoginName"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldEx
									label="登入者姓名"
									name="UserName"
									size="small"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextFieldEx
									label="網址"
									name="IP"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextFieldEx
									label="顯示前幾筆"
									name="Top"
									size="small"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<A28OrderTypePicker
									name="OrderBy"
									label="排序方式"
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

A28Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

A28Form.displayName = "A28Form";
export default A28Form;









