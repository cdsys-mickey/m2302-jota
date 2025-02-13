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
import ProdPicker from "@/components/picker/ProdPicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import Auth from "@/modules/md-auth";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import U01DataTypePicker from "./picker/U01DataTypePicker";

const U01Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<AppDeptPicker
									autoFocus
									label="門市區間"
									name="SDeptID"
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<AppDeptPicker
									// filterByOperator
									label="門市區間迄"
									name="EDeptID"
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate"
									label="日期區間"
									fullWidth
									validate
									clearable

								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="日期區間迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="SProdID"
									label="貨號區間"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="EProdID"
									label="貨號區間迄"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								<CheckboxExWrapper
									label="含撥出入"
									name="InvTx"
									defaultValue={true}
								/>

							</FlexGrid>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								<CheckboxExWrapper
									label="包含試贈樣"
									name="SType"
									defaultValue={true}
								/>
							</FlexGrid>


							<Grid item xs={12} sm={6}>
								<U01DataTypePicker
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

U01Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U01Form.displayName = "U01Form";
export default U01Form;


