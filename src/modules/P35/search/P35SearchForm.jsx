import BankPicker from "@/components/BankPicker/BankPicker";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo } from "react";

const P35SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest} >
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<TextFieldWrapper
						autoFocus
						name="lvId"
						label="廠商編號"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<TextFieldWrapper
						name="lvName"
						label="廠商名稱"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<BankPicker
						name="lvBank"
						label="銀行"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

P35SearchForm.propTypes = {

}

P35SearchForm.displayName = "P35SearchForm";
export default P35SearchForm;

