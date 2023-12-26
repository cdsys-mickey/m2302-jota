import ProdTypeA from "@/modules/md-prod-type-a";
import TaxTypes from "@/modules/md-tax-types";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

import Strings from "@/modules/md-strings";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import DialogEx from "@/shared-components/dialog/DialogEx";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TypoCheckboxExContainer } from "@/shared-components/typo/TypoCheckboxExContainer";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { Container } from "@mui/material";
import CmsTypes from "@/modules/md-cms-types";
import ProdLCats from "@/modules/md-prod-l-cats";
import ProdMCats from "@/modules/md-prod-m-cats";
import ProdSCats from "@/modules/md-prod-s-cats";
import ProdTypeB from "@/modules/md-prod-type-b";
import YesNo from "@/modules/md-yes-no";
import CmsTypePickerContainer from "@/components/picker/CmsTypePickerContainer";
import ProdCatLPickerContainer from "@/components/picker/ProdCatLPickerContainer";
import ProdCatMPickerContainer from "@/components/picker/ProdCatMPickerContainer";
import ProdCatSPickerContainer from "@/components/picker/ProdCatSPickerContainer";
import ProdTypeAPickerContainer from "@/components/picker/ProdTypeAPickerContainer";
import ProdTypeBPickerContainer from "@/components/picker/ProdTypeBPickerContainer";
import TaxTypePickerContainer from "@/components/picker/TaxTypePickerContainer";
import { A01DialogTitleButtonsContainer } from "./buttons/A01DialogTitleButtonsContainer";
import { PkgTypePickerContainer } from "../../../picker/PkgTypePickerContainer";
import PkgTypes from "../../../../modules/md-pkg-types";
import Counters from "../../../../modules/md-counters";
import CounterPickerContainer from "../../../picker/CounterPickerContainer";
import { ProdTransGridContainer } from "../trans/ProdTransGridContainer";
import { ProdComboGridContainer } from "../combo/ProdComboGridContainer";
import TypoProdCatLPickerContainer from "../../../picker/TypoProdCatLPickerContainer";
import TypoProdCatMPickerContainer from "../../../picker/TypoProdCatMPickerContainer";
import TypoProdCatSPickerContainer from "../../../picker/TypoProdCatSPickerContainer";
import TypoProdTypeAPickerContainer from "../../../picker/TypoProdTypeAPickerContainer";
import TypoProdTypeBPickerContainer from "../../../picker/TypoProdTypeBPickerContainer";
import TypoTaxTypePickerContainer from "../../../picker/TypoTaxTypePickerContainer";
import TypoCounterPickerContainer from "../../../picker/TypoCounterPickerContainer";

const A01Dialog = memo(
	forwardRef((props, ref) => {
		const {
			data,
			readWorking,
			dataLoaded,
			editing,
			updating,
			store,
			...rest
		} = props;

		return (
			<DialogEx
				ref={ref}
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A01DialogTitleButtonsContainer}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "rgb(241 241 241)",
					},
				}}
				contentSx={{
					minHeight: "30em",
				}}
				{...rest}>
				{readWorking && (
					<Container maxWidth="xs">
						<FlexBox justifyContent="center" minHeight="30em">
							<LoadingTypography iconSize="lg" variant="h5">
								讀取中...
							</LoadingTypography>
						</FlexBox>
					</Container>
				)}
				{dataLoaded && (
					<Box
						pt={1}
						sx={(theme) => ({
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
							// "& .MuiInputLabel-root:not(.Mui-focusd)": {
							// 	color: "rgb(0 0 0 / 100% )",
							// },
							// "& .MuiInputBase-input": {
							// 	color: "rgb(0 0 0 / 100% )",
							// },
						})}>
						<FormSectionTitle>基本資料</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="ProdID"
										label="貨品編號"
										autoFocus
										fullWidth
										value={data?.ProdID}
										required
										rules={{ required: "貨品編號為必填" }}
										readOnly={updating}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
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
										valueToChecked={YesNo.valueToChecked}
										checkedToValue={YesNo.checkedToValue}>
										{YesNo.getOptionLabel(data?.BarPR)}
									</TypoCheckboxExContainer>
								</Grid>
								{/* <Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="簡碼"
										name="SimpleCode"
										fullWidth
										value={data?.SimpleCode}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoCheckboxExContainer
										label="結清保留"
										name="Keep"
										value={data?.Keep}
									/>
								</Grid> */}
								<Grid item xs={12} sm={12} md={12}>
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
							</Grid>
						</FormSectionBox>

						<FormSectionTitle>分類</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoProdCatLPickerContainer
										name="catL"
										readOnly={store}>
										{ProdLCats.getOptionLabel(data?.catL)}
									</TypoProdCatLPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoProdCatMPickerContainer
										name="catM"
										readOnly={store}>
										{ProdMCats.getOptionLabel(data?.catM)}
									</TypoProdCatMPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoProdCatSPickerContainer
										name="catS"
										readOnly={store}>
										{ProdSCats.getOptionLabel(data?.catS)}
									</TypoProdCatSPickerContainer>
								</Grid>
								{/* <Grid item xs={12} sm={12} md={2}>
									<TypoCheckboxExContainer
										label="可退貨"
										name="Rejectable"
									/>
								</Grid> */}
								<FlexBox fullWidth />
								<Grid item xs={12} sm={12} md={3}>
									<TypoProdTypeAPickerContainer
										name="typeA"
										readOnly={store}>
										{ProdTypeA.getOptionLabel(data?.typeA)}
									</TypoProdTypeAPickerContainer>
								</Grid>

								<Grid item xs={12} sm={12} md={3}>
									<TypoProdTypeBPickerContainer
										name="typeB"
										readOnly={store}>
										{ProdTypeB.getOptionLabel(data?.typeB)}
									</TypoProdTypeBPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTaxTypePickerContainer
										name="taxType"
										label="稅別"
										readOnly={store}>
										{TaxTypes.getOptionLabel(data?.taxType)}
									</TypoTaxTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoCounterPickerContainer
										name="counter"
										autoFocus={store}>
										{Counters.getOptionLabel(data?.counter)}
									</TypoCounterPickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>
						<FormSectionTitle>成本</FormSectionTitle>
						<FormSectionBox p={1} pt={0} mb={2}>
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
										{Strings.formatPrice(data?.TranCost)}
									</TypoTextFieldContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="LocalCost"
										label="批發成本(本)"
										type="number"
										readOnly={store}>
										{Strings.formatPrice(data?.LocalCost)}
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
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={2}
							mb={2}>
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
									<CmsTypePickerContainer
										name="cmsType"
										readOnly={store}>
										{CmsTypes.getOptionLabel(data?.cmsType)}
									</CmsTypePickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>

						{/* <FormSectionTitle>安全存量</FormSectionTitle>
						<FormSectionBox
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
							</Grid>
						</FormSectionBox> */}

						<FormSectionTitle>包裝單位</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12} sm={12} md={3}>
									<PkgTypePickerContainer
										name="bunit"
										label="庫存"
										readOnly={store}>
										{PkgTypes.getOptionLabel(data?.bunit)}
									</PkgTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkgTypePickerContainer
										name="sunit"
										label="銷售"
										readOnly={store}>
										{PkgTypes.getOptionLabel(data?.sunit)}
									</PkgTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkgTypePickerContainer
										name="iunit"
										label="進貨"
										readOnly={store}>
										{PkgTypes.getOptionLabel(data?.iunit)}
									</PkgTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkgTypePickerContainer
										name="munit"
										label="BOM"
										readOnly={store}>
										{PkgTypes.getOptionLabel(data?.munit)}
									</PkgTypePickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionTitle>換算率</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="銷/存"
										type="number"
										name="SRate"
										value={Strings.formatRate(data?.SRate)}
										readOnly={store}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="進/存"
										type="number"
										name="IRate"
										value={Strings.formatRate(data?.IRate)}
										readOnly={store}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="BOM/存"
										type="number"
										name="MRate"
										value={Strings.formatRate(data?.MRate)}
										readOnly={store}
									/>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionTitle>售價</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="建議售價"
										name="Price"
										type="number"
										value={Strings.formatPrice(data?.Price)}
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
						<Grid container columns={24} spacing={1}>
							<Grid item xs={24} sm={24} md={24} lg={11} xl={11}>
								<FormSectionBox p={1} pt={0} mb={2}>
									<FormSectionTitle>
										調撥成本
									</FormSectionTitle>
									<ProdTransGridContainer readOnly={store} />
								</FormSectionBox>
							</Grid>
							<Grid item xs={24} sm={24} md={6} lg={13} xl={13}>
								<FormSectionBox p={1} pt={0} mb={2}>
									<FormSectionTitle>
										組合細項
									</FormSectionTitle>
									<ProdComboGridContainer readOnly={store} />
								</FormSectionBox>
							</Grid>
						</Grid>

						{/* <FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<TypoA01TransferEditorContainer
							name="transferItems"
							value={data?.Transfer}
						/>
					</FormSectionBox> */}
						{/* 組合 */}
					</Box>
				)}
			</DialogEx>
		);
	})
);

A01Dialog.propTypes = {
	data: PropTypes.object,
	// readState: PropTypes.symbol,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
};

A01Dialog.displayName = "A01Dialog";
export default A01Dialog;
