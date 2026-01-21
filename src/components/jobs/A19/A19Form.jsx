import AppDeptPicker from "@/components/fields/AppDeptPicker";
import ContainerEx from "@/shared-components/ContainerEx";
import { FlexBox } from "shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import Auth from "@/modules/Auth.mjs";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import RangeGroup from "@/shared-components/RangeGroup";
import ProdPicker from "../../picker/ProdPicker";
import A19InOutCheckbox from "./buttons/A19InOutCheckbox";
import A19DataTypePicker from "./picker/A19DataTypePicker";
import A19FreeCheckbox from "./buttons/A19FreeCheckbox";

const A19Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="貨品區間" required
									leftComponent={<ProdPicker
										name="sprod"
										label="起始商品編號"
										size="small"
										virtualize
										// filterByServer
										// queryRequired
										typeToSearchText="以編號,條碼或名稱搜尋"
										disableOpenOnInput
										selectOnFocus
										blurToLookup
										required
										rules={{
											required: "起始商品為必填"
										}}
										borderless
										placeholder="起"

										autoFocus
									/>}
									rightComponent={<ProdPicker
										name="eprod"
										label="截止商品編號"
										size="small"
										virtualize
										// filterByServer
										// queryRequired
										typeToSearchText="以編號,條碼或名稱搜尋"
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							{/* 條碼 */}
							{/* <Grid item xs={12} sm={6}>
								<ControlledTextField
									name="SBarcode"
									label="起始條碼編號"
									size="small"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									name="EBarcode"
									label="截止條碼編號"
									size="small"
									fullWidth
								/>
							</Grid> */}
							{/* 商品名稱 */}
							{/* <Grid item xs={12} sm={6}>
								<ControlledTextField
									name="ProdData"
									label="商品名稱"
									size="small"
									fullWidth
								/>
							</Grid> */}
							<FlexBox fullWidth />
							{/* 門市 */}
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="門市區間"
									leftComponent={<AppDeptPicker
										// filterByOperator
										label="起始門市"
										name="sdept"
										disableOpenOnInput
										selectOnFocus
										scope={Auth.SCOPES.BRANCH_HQ}
										borderless
										placeholder="起"
									/>}
									rightComponent={<AppDeptPicker
										// filterByOperator
										label="截止門市"
										name="edept"
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
									leftComponent={<DatePickerWrapper name="SDate"
										label="起始日期"
										fullWidth
										validate
										clearable
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper name="EDate"
										label="截止日期"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<A19DataTypePicker
									name="dataType"
									label="資料類型"
									required
									rules={{
										required: "資料類型為必填"
									}}
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
						<Grid container>
							<Grid item xs={12} sm={6} >
								<FlexBox alignItems="center">
									<A19InOutCheckbox
										label="包含撥出入"
										name="InclInv"
										defaultValue={true}
									/>
									<A19FreeCheckbox
										label="含試贈樣"
										name="InclTest"
										defaultValue={false}
									/>
								</FlexBox>
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
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

A19Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

A19Form.displayName = "A19Form";
export default A19Form;
