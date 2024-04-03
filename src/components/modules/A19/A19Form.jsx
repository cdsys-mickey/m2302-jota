import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import ControlledDatePicker from "@/shared-components/controlled/ControlledDatePicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexBox from "../../../shared-components/FlexBox";
import ControlledCheckboxEx from "../../../shared-components/checkbox/ControlledCheckboxEx";
import { ProdPickerContainer } from "../../picker/ProdPickerContainer";
import A19DataTypePicker from "./picker/A19DataTypePicker";
import UserDeptPicker from "../../UserDeptPicker";
import AppDeptPicker from "../../fields/AppDeptPicker";

const A19Form = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form {...rest}>
				<Box
					pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "105%",
							// fontWeight: 500,
							// color: "rgba(0, 0, 0, 0.8 )",
						},
						"& .MuiInputLabel-shrink": {
							fontSize: "120%",
							fontWeight: 600,
							left: "-2px",
							// color: theme.palette.primary.main,
						},
					})}>
					<FormSectionBox py={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<ProdPickerContainer
									name="sprod"
									label="起始商品編號"
									size="small"
									typeToSearchText="以編號,條碼或名稱搜尋"
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<ProdPickerContainer
									name="eprod"
									label="截止商品編號"
									size="small"
									typeToSearchText="以編號,條碼或名稱搜尋"
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
							<Grid item xs={12} sm={6}>
								{/* <AuthDeptPicker label="起始門市" name="sdept" /> */}
								<AppDeptPicker
									filterByOperator
									label="起始門市"
									name="sdept"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* <AuthDeptPicker label="截止門市" name="edept" /> */}
								<AppDeptPicker
									filterByOperator
									label="截止門市"
									name="edept"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledDatePicker
									name="SDate"
									label="起始日期"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledDatePicker
									name="EDate"
									label="截止日期"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<A19DataTypePicker
									name="dataType"
									label="資料類型"
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
							<Grid item xs={12} sm={6}>
								<ControlledCheckboxEx
									label="含撥出入"
									name="transIncluded"
									defaultValue={true}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
				</Box>
			</form>
		</ContainerEx>
	);
});

A19Form.propTypes = {
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A19Form.displayName = "A19Form";
export default A19Form;
