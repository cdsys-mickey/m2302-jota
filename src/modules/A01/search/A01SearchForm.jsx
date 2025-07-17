import CmsTypePicker from "@/components/CmsTypePicker/CmsTypePicker";
import CounterPicker from "@/components/picker/CounterPicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";

const A01SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1.5} columns={12} {...rest}>
				<ResponsiveGrid item xs={12} sm={12}>
					<TextFieldWrapper
						autoFocus
						name="lvId"
						label="貨品編號"
						variant="outlined"
						size="small"
						fullWidth
						// EndAdornmentComponent={ClearInputButton}
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12} sm={12}>
					<TextFieldWrapper
						name="lvBarcode"
						label="條碼"
						variant="outlined"
						size="small"
						fullWidth
						// EndAdornmentComponent={ClearInputButton}
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12} sm={12}>
					<TextFieldWrapper
						name="lvName"
						label="產品名稱"
						variant="outlined"
						size="small"
						fullWidth
						// EndAdornmentComponent={ClearInputButton}
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12}>
					<ProdCatLPicker
						name="lvCatL"
						disableOpenOnInput
						selectOnFocus
					// slotProps={{
					// 	paper: {
					// 		sx: {
					// 			width: 240,
					// 		},
					// 	},
					// }}
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12}>
					<ProdCatMPicker
						name="lvCatM"
						disableOpenOnInput
						selectOnFocus
						catLName="lvCatL"
					// slotProps={{
					// 	paper: {
					// 		sx: {
					// 			width: 240,
					// 		},
					// 	},
					// }}
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12}>
					<ProdCatSPicker
						name="lvCatS"
						disableOpenOnInput
						selectOnFocus
						catLName="lvCatL"
						catMName="lvCatM"
					// slotProps={{
					// 	paper: {
					// 		sx: {
					// 			width: 240,
					// 		},
					// 	},
					// }}
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12}>
					<CounterPicker
						label="櫃別"
						name="lvCounter"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={12}>
					<CmsTypePicker
						label="佣金類別"
						name="lvCmsType"
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

A01SearchForm.propTypes = {

}

A01SearchForm.displayName = "A01SearchForm";
export default A01SearchForm;