import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import Auth from "@/modules/Auth.mjs";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import U03DataTypePicker from "./picker/U03DataTypePicker";

const U03Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="門市區間"
									leftComponent={<AppDeptPicker
										autoFocus
										label="門市區間"
										name="SDeptID"
										disableOpenOnInput
										selectOnFocus
										scope={Auth.SCOPES.BRANCH_HQ}
										borderless
										placeholder="起"
									/>}
									rightComponent={<AppDeptPicker
										// filterByOperator
										label="門市區間迄"
										name="EDeptID"
										disableOpenOnInput
										selectOnFocus
										scope={Auth.SCOPES.BRANCH_HQ}
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										name="SDate"
										fullWidth
										validate
										clearable
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
							<Grid item xs={12} sm={6}>
								<ProdCatLPicker
									name="catL"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatMPicker
									name="catM"
									disableOpenOnInput
									selectOnFocus
									catLName="catL"
								/>
							</Grid>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								<CheckboxExField
									label="包含撥出入"
									name="InvTx"
									defaultValue={true}
									variant="outlined"
									size="small"
									fullWidth
								/>

							</FlexGrid>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								<CheckboxExField
									label="包含試贈樣"
									name="SType"
									defaultValue={true}
									variant="outlined"
									size="small"
									fullWidth
								/>
							</FlexGrid>


							<Grid item xs={12} sm={6}>
								<U03DataTypePicker
									name="RptType"
									label="報表類型"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* <StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/> */}
							</Grid>
						</Grid>
						<FlexBox mt={1.5}>
							<Grid container>
								<Grid item xs={12} sm={12}>
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

U03Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U03Form.displayName = "U03Form";
export default U03Form;



