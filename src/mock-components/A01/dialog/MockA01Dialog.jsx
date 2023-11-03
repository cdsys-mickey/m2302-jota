// import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { MockProdClassLg } from "@/mocks/mock-prod-class-lg";
import { MockProdClassMd } from "@/mocks/mock-prod-class-md";
import { MockProdClassSm } from "@/mocks/mock-prod-class-sm";
import CabinetTypes from "@/modules/md-cabinet-types";
import ProdCats from "@/modules/md-prod-cats";
import ProdClasses from "@/modules/md-prod-classes";
import ProdTypes from "@/modules/md-prod-types";
import TaxTypes from "@/modules/md-tax-types";
import Commission from "@/modules/md-commission-types";

import DialogEx from "@/shared-components/dialog/DialogEx";
import { TypoCheckboxExContainer } from "@/shared-components/typo/TypoCheckboxExContainer";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import TypoWebApiOptionsPickerContainer from "@/shared-components/typo/TypoWebApiOptionsPickerContainer";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import TypoA01TransferEditorContainer from "../transfer/TypoA01TransferEditorContainer";
import A01DialogTitleButtonsContainer from "./A01DialogTitleButtonsContainer";
import { forwardRef, memo } from "react";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import Strings from "@/modules/md-strings";

const MockA01Dialog = memo(
	forwardRef((props, ref) => {
		const { data, ...rest } = props;
		return (
			<DialogEx
				ref={ref}
				fullWidth
				maxWidth="md"
				titleButtons={<A01DialogTitleButtonsContainer />}
				titleProps={{ returnText: "取消編輯" }}
				{...rest}>
				<Box pt={1}>
					<FormSectionTitle>基本資料</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									autoFocus
									fullWidth
									required
									label="貨品編號"
									name="Code"
									value={data?.Code}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="條碼"
									name="Barcode"
									fullWidth
									value={data?.Barcode}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
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
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
									required
									label="品名規格"
									name="Name"
									fullWidth>
									{data?.Name}
								</TypoTextFieldContainer>
							</Grid>
						</Grid>
					</FormSectionBox>

					<FormSectionTitle>分類</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="大"
									name="PrdClassL"
									options={MockProdClassLg}
									getOptionLabel={ProdClasses.getOptionLabel}
									isOptionEqualToValue={
										ProdClasses.isOptionEqualToValue
									}
									value={data?.PrdClassL}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="中"
									name="PrdClassM"
									options={MockProdClassMd}
									getOptionLabel={ProdClasses.getOptionLabel}
									isOptionEqualToValue={
										ProdClasses.isOptionEqualToValue
									}
									value={data?.PrdClassM}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="小"
									name="PrdClassS"
									options={MockProdClassSm}
									getOptionLabel={ProdClasses.getOptionLabel}
									isOptionEqualToValue={
										ProdClasses.isOptionEqualToValue
									}
									value={data?.PrdClassS}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoCheckboxExContainer
									label="可退貨"
									name="Rejectable"
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="品別"
									name="ProdType"
									options={Object.entries(
										ProdTypes.Types
									).map(([id, name]) => ({
										id,
										name,
									}))}
									getOptionLabel={ProdTypes.getOptionLabel}
									isOptionEqualToValue={
										ProdTypes.isOptionEqualToValue
									}
									value={data?.ProdType}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="櫃別"
									name="Cabinet"
									options={Object.entries(
										CabinetTypes.Types
									).map(([id, name]) => ({
										id,
										name,
									}))}
									getOptionLabel={CabinetTypes.getOptionLabel}
									isOptionEqualToValue={
										CabinetTypes.isOptionEqualToValue
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="品類"
									name="ProdCat"
									options={Object.entries(ProdCats.data).map(
										([id, name]) => ({
											id,
											name,
										})
									)}
									getOptionLabel={ProdCats.getOptionLabel}
									isOptionEqualToValue={
										ProdCats.isOptionEqualToValue
									}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="稅別"
									name="TaxType"
									options={Object.entries(TaxTypes.data).map(
										([id, name]) => ({
											id,
											name,
										})
									)}
									getOptionLabel={TaxTypes.getOptionLabel}
									isOptionEqualToValue={
										TaxTypes.isOptionEqualToValue
									}
									value={data?.TaxType}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>

					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="標準成本"
									name="Cost"
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="調撥成本"
									name="TransferCost"
									value={data?.TransferCost}
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="批發成本(本)"
									name="WholesaleCostBase"
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="批發成本(外)"
									name="WholesaleCostOut"
									type="number"
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="儲位"
									name="Repo"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoCheckboxExContainer
									label="列印條碼"
									name="PrintBarcode"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionsPickerContainer
									label="佣金類別"
									name="CommissionType"
									fullWidth
									options={Object.entries(
										Commission.Types
									).map(([id, name]) => ({
										id,
										name,
									}))}
									getOptionLabel={Commission.getOptionLabel}
									isOptionEqualToValue={
										Commission.isOptionEqualToValue
									}
									value={data?.CommissionType}
								/>
							</Grid>

							{/* <Grid xs={12} sm={12} md={4}>
						<EditableTextContainer label="銷售" />
					</Grid>
					<Grid xs={12} sm={12} md={4}>
						<EditableTextContainer label="進貨" />
					</Grid>
					<Grid xs={12} sm={12} md={4}>
						<EditableTextContainer label="BOM" />
					</Grid>
					<Grid xs={12} sm={12} md={12}>
						<EditableTextContainer label="比率" />
					</Grid>
					<Grid xs={12} sm={12} md={12}>
						<EditableTextContainer label="建議售價" />
					</Grid> */}
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>安全存量</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="平日"
									name="Stock"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="假日"
									name="Stock2"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="續假日"
									name="Stock2"
									fullWidth
									type="number"
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>包裝單位</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="庫存"
									type="number"
									name="PackageStock">
									{data?.PackageStock}個
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="銷售"
									type="number"
									name="PackageSales">
									{data?.PackageSale}個
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="進貨"
									type="number"
									name="PackagePurchase">
									{data?.PackagePurchase}個
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="BOM"
									type="number"
									name="PackageBOM">
									{data?.PackageBOM}個
								</TypoTextFieldContainer>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>換算率</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="銷/存"
									type="number"
									name="SaleVsStock">
									{data?.SaleVsStock}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="進/存"
									type="number"
									name="PurchaseVsStock">
									{data?.PurchaseVsStock}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									label="BOM/存"
									type="number"
									name="BOMVsStock">
									{data?.BOMVsStock}
								</TypoTextFieldContainer>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>售價</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="建議售價"
									name="Price"
									type="number">
									{Strings.formatPrice(data?.Price)}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="售價A"
									type="number"
									name="PriceA">
									{Strings.formatPrice(data?.PriceA)}
								</TypoTextFieldContainer>
							</Grid>

							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="售價B"
									type="number"
									name="PriceB">
									{Strings.formatPrice(data?.PriceB)}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="售價C"
									type="number"
									name="PriceC">
									{Strings.formatPrice(data?.PriceC)}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="售價D"
									type="number"
									name="PriceD">
									{Strings.formatPrice(data?.PriceD)}
								</TypoTextFieldContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									label="售價E"
									type="number"
									name="PriceE">
									{Strings.formatPrice(data?.PriceE)}
								</TypoTextFieldContainer>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>調撥成本</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<TypoA01TransferEditorContainer
							name="transferItems"
							value={data?.Transfer}
						/>
					</FormSectionBox>
					{/* 組合 */}
				</Box>
			</DialogEx>
		);
	})
);

MockA01Dialog.propTypes = {
	data: PropTypes.object,
};

export default MockA01Dialog;
