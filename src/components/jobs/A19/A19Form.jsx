import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import ControlledDatePicker from "@/shared-components/date-picker/ControlledDatePicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import ControlledCheckboxEx from "@/shared-components/checkbox/ControlledCheckboxEx";
import FormBox from "@/shared-components/form/FormBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import AppDeptPicker from "@/components/fields/AppDeptPicker";

import { A19FormButtonsContainer } from "./buttons/A19FormButtonsContainer";
import A19DataTypePicker from "./picker/A19DataTypePicker";
import ProdPicker from "../../picker/ProdPicker";

const A19Form = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form {...rest}>
				<FormBox pt={1}>
					<FormSectionBox py={1} px={1}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<ProdPicker
									name="sprod"
									label="起始商品編號"
									size="small"
									virtualize
									// filterByServer
									// queryRequired
									typeToSearchText="以編號,條碼或名稱搜尋"
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<ProdPicker
									name="eprod"
									label="截止商品編號"
									size="small"
									virtualize
									// filterByServer
									// queryRequired
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
									// filterByOperator
									label="起始門市"
									name="sdept"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* <AuthDeptPicker label="截止門市" name="edept" /> */}
								<AppDeptPicker
									// filterByOperator
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
						</Grid>
						<Grid container>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								<ControlledCheckboxEx
									label="含撥出入"
									name="transIncluded"
									defaultValue={true}
								/>
							</FlexGrid>
							<Grid item xs={12} sm={6}>
								<FlexToolbar align="right">
									<A19FormButtonsContainer />
								</FlexToolbar>
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
};

A19Form.displayName = "A19Form";
export default A19Form;
