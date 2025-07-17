import BankPicker from "@/components/BankPicker/BankPicker";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";

const A05SearchForm = memo((props) => {
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

A05SearchForm.propTypes = {

}

A05SearchForm.displayName = "A05SearchForm";
export default A05SearchForm;