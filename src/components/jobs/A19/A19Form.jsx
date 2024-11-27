import AppDeptPicker from "@/components/fields/AppDeptPicker";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import ProdPicker from "../../picker/ProdPicker";
import A19DataTypePicker from "./picker/A19DataTypePicker";
import Auth from "@/modules/md-auth";
import DebugDialogButtonContainer from "@/components/home/debug/DebugDialogButtonContainer";

const A19Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="sprod"
									label="起始商品編號"
									size="small"
									virtualize
									// filterByServer
									// queryRequired
									typeToSearchText="以編號,條碼或名稱搜尋"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="eprod"
									label="截止商品編號"
									size="small"
									virtualize
									// filterByServer
									// queryRequired
									typeToSearchText="以編號,條碼或名稱搜尋"
									disableOpenOnInput
									selectOnFocus
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
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								{/* <AuthDeptPicker label="截止門市" name="edept" /> */}
								<AppDeptPicker
									// filterByOperator
									label="截止門市"
									name="edept"
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.BRANCH_HQ}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate"
									label="起始日期"
									fullWidth
									validate
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="截止日期"
									fullWidth
									validate
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
								<CheckboxExWrapper
									label="含撥出入"
									name="transIncluded"
									defaultValue={true}
								/>
							</FlexGrid>
							<Grid item xs={12} sm={6}>
								<FlexToolbar align="right">
									{/* <A19FormButtonsContainer /> */}
									<DebugDialogButtonContainer onClick={onDebugSubmit} />
									<ButtonWrapper
										name="submit"
										responsive
										startIcon={<OpenInNewIcon />}
										variant="contained"
										color="primary"
										type="submit"
									>
										執行
									</ButtonWrapper>
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
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

A19Form.displayName = "A19Form";
export default A19Form;
