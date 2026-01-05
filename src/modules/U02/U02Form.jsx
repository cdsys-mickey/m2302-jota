import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import Auth from "@/modules/Auth.mjs";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import U02DataTypePicker from "./picker/U02DataTypePicker";

const U02Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
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
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									minDate={"2026/01/01"}
									name="SalYM"
									label="銷售年月"
									fullWidth
									validate
									clearable
									views={['year', 'month']}
									format="yyyy/MM"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>

							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="貨號區間"
									leftComponent={<ProdPicker
										name="SProdID"
										label="貨號區間"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<ProdPicker
										name="EProdID"
										label="貨號區間迄"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
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
								<U02DataTypePicker
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

U02Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U02Form.displayName = "U02Form";
export default U02Form;



