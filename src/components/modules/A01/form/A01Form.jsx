import ProdTypeA from "@/modules/md-prod-type-a";
import TaxTypes from "@/modules/md-tax-types";
import { Box, Grid, Tab } from "@mui/material";
import { memo } from "react";

import CmsTypes from "@/modules/md-cms-types";
import Counters from "@/modules/md-counters";
import PkgTypes from "@/modules/md-pkg-types";
import ProdLCats from "@/modules/md-prod-l-cats";
import ProdMCats from "@/modules/md-prod-m-cats";
import ProdSCats from "@/modules/md-prod-s-cats";
import ProdTypeB from "@/modules/md-prod-type-b";
import Strings from "@/modules/md-strings";
import YesNo from "@/modules/md-yes-no";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TypoCheckboxExContainer } from "@/shared-components/typo/TypoCheckboxExContainer";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { ProdComboGridContainer } from "./combo/ProdComboGridContainer";
import { ProdTransGridContainer } from "./trans/ProdTransGridContainer";
import TypoCmsTypePickerContainer from "./fields/TypoCmsTypePickerContainer";
import { TypoCounterPickerContainer } from "./fields/TypoCounterPickerContainer";
import { TypoPkgTypePickerContainer } from "./fields/TypoPkgTypePickerContainer";
import { TypoProdCatLPickerContainer } from "./fields/TypoProdCatLPickerContainer";
import { TypoProdCatMPickerContainer } from "./fields/TypoProdCatMPickerContainer";
import { TypoProdCatSPickerContainer } from "./fields/TypoProdCatSPickerContainer";
import { TypoProdTypeAPickerContainer } from "./fields/TypoProdTypeAPickerContainer";
import { TypoProdTypeBPickerContainer } from "./fields/TypoProdTypeBPickerContainer";
import { TypoTaxTypePickerContainer } from "./fields/TypoTaxTypePickerContainer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import A01 from "../../../../modules/md-a01";
import TaxTypePickerContainer from "../../../picker/TaxTypePickerContainer";
import ErrorBox from "../../../../shared-components/ErrorBox";
import AlertEx from "../../../../shared-components/AlertEx";

const A01Form = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		dataLoaded,
		editing,
		updating,
		store,
		// TAB
		tabIndex,
		handleTabChange,
		...rest
	} = props;
	return (
		<form {...rest}>
			{readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)}
			{readError && (
				<Box pt="20%">
					<AlertEx
						variant="filled"
						title="讀取失敗"
						error={readError}
					/>
				</Box>
			)}
			{dataLoaded && (
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
					<TabContext value={tabIndex}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList
								onChange={handleTabChange}
								aria-label="lab API tabs example">
								<Tab label="基本資料" value={A01.Tabs.INFO} />
								<Tab label="調撥成本" value={A01.Tabs.TRANS} />
								<Tab label="組合商品" value={A01.Tabs.COMBO} />
							</TabList>
						</Box>
						<TabPanel value={A01.Tabs.INFO}>
							{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={4}>
										<TypoTextFieldContainer
											name="ProdID"
											label="貨品編號"
											autoFocus
											fullWidth
											value={data?.ProdID}
											required
											rules={{
												required: "貨品編號為必填",
											}}
											readOnly={updating}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={8}>
										<TypoTextFieldContainer
											name="ProdData"
											label="品名規格"
											fullWidth
											required
											rules={{
												required: "品名規格為必填",
											}}
											readOnly={store}>
											{data?.ProdData}
										</TypoTextFieldContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<TypoTextFieldContainer
											label="條碼"
											name="Barcode"
											fullWidth
											value={data?.Barcode}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoCheckboxExContainer
											label="列印條碼"
											defaultValue="N"
											name="BarPR"
											readOnly={store}
											valueToChecked={
												YesNo.valueToChecked
											}
											checkedToValue={
												YesNo.checkedToValue
											}>
											{YesNo.getOptionLabel(data?.BarPR)}
										</TypoCheckboxExContainer>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>分類</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={4}>
										<TypoProdCatLPickerContainer
											name="catL"
											readOnly={store}>
											{ProdLCats.getOptionLabel(
												data?.catL
											)}
										</TypoProdCatLPickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<TypoProdCatMPickerContainer
											name="catM"
											readOnly={store}>
											{ProdMCats.getOptionLabel(
												data?.catM
											)}
										</TypoProdCatMPickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<TypoProdCatSPickerContainer
											name="catS"
											readOnly={store}>
											{ProdSCats.getOptionLabel(
												data?.catS
											)}
										</TypoProdCatSPickerContainer>
									</Grid>
									<FlexBox fullWidth />
									<Grid item xs={12} sm={12} md={3}>
										<TypoProdTypeAPickerContainer
											name="typeA"
											readOnly={store}>
											{ProdTypeA.getOptionLabel(
												data?.typeA
											)}
										</TypoProdTypeAPickerContainer>
									</Grid>

									<Grid item xs={12} sm={12} md={3}>
										<TypoProdTypeBPickerContainer
											name="typeB"
											readOnly={store}>
											{ProdTypeB.getOptionLabel(
												data?.typeB
											)}
										</TypoProdTypeBPickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TaxTypePickerContainer
											typo
											name="taxType"
											label="稅別"
											defaultValue={TaxTypes.getById("T")}
											readOnly={store}>
											{TaxTypes.getOptionLabel(
												data?.taxType
											)}
										</TaxTypePickerContainer>
										{/* <TypoTaxTypePickerContainer
											name="taxType"
											label="稅別"
											defaultValue={TaxTypes.getById("T")}
											readOnly={store}>
											{TaxTypes.getOptionLabel(
												data?.taxType
											)}
										</TypoTaxTypePickerContainer> */}
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoCounterPickerContainer
											name="counter"
											autoFocus={store}>
											{Counters.getOptionLabel(
												data?.counter
											)}
										</TypoCounterPickerContainer>
									</Grid>
								</Grid>
							</FormSectionBox>
							<FormSectionTitle>成本</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											name="StdCost"
											label="標準成本"
											type="number"
											readOnly={store}>
											{Strings.formatPrice(data?.StdCost)}
										</TypoTextFieldContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											name="TranCost"
											label="調撥成本"
											type="number"
											readOnly={store}>
											{Strings.formatPrice(
												data?.TranCost
											)}
										</TypoTextFieldContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											name="LocalCost"
											label="批發成本(本)"
											type="number"
											readOnly={store}>
											{Strings.formatPrice(
												data?.LocalCost
											)}
										</TypoTextFieldContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											name="OutCost"
											label="批發成本(外)"
											type="number"
											readOnly={store}>
											{Strings.formatPrice(data?.OutCost)}
										</TypoTextFieldContainer>
									</Grid>
								</Grid>
							</FormSectionBox>
							<FormSectionTitle>安全存量</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											name="SafeQty"
											label="平日安全存量"
											type="number"
											readOnly={store}
											fullWidth>
											{Strings.formatPrice(data?.SafeQty)}
										</TypoTextFieldContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											label="儲位"
											name="Location"
											readOnly={store}
											fullWidth>
											{data?.Location}
										</TypoTextFieldContainer>
									</Grid>

									<Grid item xs={12} sm={12} md={4}>
										<TypoCmsTypePickerContainer
											name="cmsType"
											readOnly={store}>
											{CmsTypes.getOptionLabel(
												data?.cmsType
											)}
										</TypoCmsTypePickerContainer>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>包裝單位</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TypoPkgTypePickerContainer
											name="bunit"
											label="庫存"
											readOnly={store}>
											{PkgTypes.getOptionLabel(
												data?.bunit
											)}
										</TypoPkgTypePickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoPkgTypePickerContainer
											name="sunit"
											label="銷售"
											readOnly={store}>
											{PkgTypes.getOptionLabel(
												data?.sunit
											)}
										</TypoPkgTypePickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoPkgTypePickerContainer
											name="iunit"
											label="進貨"
											readOnly={store}>
											{PkgTypes.getOptionLabel(
												data?.iunit
											)}
										</TypoPkgTypePickerContainer>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoPkgTypePickerContainer
											name="munit"
											label="BOM"
											readOnly={store}>
											{PkgTypes.getOptionLabel(
												data?.munit
											)}
										</TypoPkgTypePickerContainer>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>換算率</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											label="銷/存"
											type="number"
											name="SRate"
											value={Strings.formatRate(
												data?.SRate
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											label="進/存"
											type="number"
											name="IRate"
											value={Strings.formatRate(
												data?.IRate
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TypoTextFieldContainer
											label="BOM/存"
											type="number"
											name="MRate"
											value={Strings.formatRate(
												data?.MRate
											)}
											readOnly={store}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>

							<FormSectionTitle>售價</FormSectionTitle>
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="建議售價"
											name="Price"
											type="number"
											value={Strings.formatPrice(
												data?.Price
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="售價A"
											type="number"
											name="PriceA"
											value={Strings.formatPrice(
												data?.PriceA
											)}
											readOnly={store}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="售價B"
											type="number"
											name="PriceB"
											value={Strings.formatPrice(
												data?.PriceB
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="售價C"
											type="number"
											name="PriceC"
											value={Strings.formatPrice(
												data?.PriceC
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="售價D"
											type="number"
											name="PriceD"
											value={Strings.formatPrice(
												data?.PriceD
											)}
											readOnly={store}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={2}>
										<TypoTextFieldContainer
											label="售價E"
											type="number"
											name="PriceE"
											value={Strings.formatPrice(
												data?.PriceE
											)}
											readOnly={store}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
						</TabPanel>
						<TabPanel value={A01.Tabs.TRANS}>
							<ProdTransGridContainer store={store} />
						</TabPanel>
						<TabPanel value={A01.Tabs.COMBO}>
							<ProdComboGridContainer store={store} />
						</TabPanel>
						{/* <Grid container columns={24} spacing={1}>
							<Grid item xs={24} sm={24} md={24} lg={11} xl={11}>
								<FormSectionBox p={1} pt={0} mb={2}>
									<FormSectionTitle>
										調撥成本
									</FormSectionTitle>
									<ProdTransGridContainer store={store} />
								</FormSectionBox>
							</Grid>
							<Grid item xs={24} sm={24} md={6} lg={13} xl={13}>
								<FormSectionBox p={1} pt={0} mb={2}>
									<FormSectionTitle>
										組合細項
									</FormSectionTitle>
									<ProdComboGridContainer store={store} />
								</FormSectionBox>
							</Grid>
						</Grid> */}
					</TabContext>
				</Box>
			)}
		</form>
	);
});

A01Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleTabChange: PropTypes.func,
};

A01Form.displayName = "A01Form";
export default A01Form;