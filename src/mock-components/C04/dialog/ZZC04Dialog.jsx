import { TypoC04OrderDetailsEditorContainer } from "@/mock-components/C04/order-detail/TypoC04OrderDetailsEditorContainer";
import Keepers from "@/modules/md-keepers";
import Suppliers from "@/modules/md-suppliers";
import FlexBox from "@/shared-components/FlexBox";
import { TypoCheckboxExContainer } from "@/shared-components/checkbox/TypoCheckboxExContainer";
import DialogEx from "@/shared-components/dialog/DialogEx";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TypoDatePickerContainer } from "@/shared-components/typo/TypoDatePickerContainer";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { TextFieldWrapper } from "../../../shared-components/text-field/TextFieldWrapper";
import SupplierLabel from "../supplier/SupplierLabel";
import { C04DialogTitleButtonsContainer } from "./ZZC04DialogTitleButtonsContainer";

const C04Dialog = memo(
	forwardRef(({ data, ...rest }, ref) => {
		return (
			<DialogEx
				ref={ref}
				fullWidth
				maxWidth="md"
				titleButtons={<C04DialogTitleButtonsContainer />}
				titleProps={{ returnText: "取消編輯" }}
				{...rest}>
				<Box pt={1}>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									autoFocus
									fullWidth
									required
									label="進貨單號"
									name="Code">
									{data?.id}
								</TextFieldWrapper>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								{/* <TypoDateFieldContainer
									
									label="進貨日期"
									name="date"
									fullWidth>
									{data?.date}
								</TypoDateFieldContainer> */}
								<TypoDatePickerContainer
									label="進貨日期"
									name="Barcode"
									fullWidth>
									{data?.date}
								</TypoDatePickerContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoWebApiOptionPickerContainer
									label="倉管人員"
									name="keeper.id"
									options={Keepers.data}
									getOptionLabel={Keepers.getOptionLabel}
									isOptionEqualToValue={
										Keepers.isOptionEqualToValue
									}>
									{data?.keeper.id}
								</TypoWebApiOptionPickerContainer>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={12}>
								<TypoWebApiOptionPickerContainer
									label="廠商"
									name="supplier.id"
									options={Suppliers.data}
									sx={{
										width: 400,
										maxWidth: "100%",
									}}
									getOptionLabel={Suppliers.getOptionLabel}
									isOptionEqualToValue={
										Suppliers.isOptionEqualToValue
									}>
									<SupplierLabel value={data?.supplier} />
								</TypoWebApiOptionPickerContainer>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									required
									label="發票號碼"
									name="InvoiceNumber"
									fullWidth>
									{data?.InvoiceNumber}
								</TextFieldWrapper>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<TypoCheckboxExContainer
									label="稅外加"
									name="ExcludingVAT"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									label="採購單號"
									name="Stock2"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>

					<FormSectionTitle>明細</FormSectionTitle>
					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<TypoC04OrderDetailsEditorContainer
							name="items"
							value={data}
							// variant="standard"
						/>
					</FormSectionBox>

					<FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.03)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									multiline
									label="備註"
									name="Note"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
				</Box>
			</DialogEx>
		);
	})
);

C04Dialog.displayName = "C04Dialog";
C04Dialog.propTypes = {
	data: PropTypes.object,
};

export default C04Dialog;
