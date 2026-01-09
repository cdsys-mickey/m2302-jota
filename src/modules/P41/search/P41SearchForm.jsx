import BankPicker from "@/components/BankPicker/BankPicker";
import OrderDirPicker from "@/components/picker/OrderDirPicker";
import { DatePickerEx } from "@/shared-components";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";

const P41SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest} >
				<ResponsiveGrid item md={6} lg={4}>
					<TextFieldWrapper
						autoFocus
						name="qs"
						label="編號/名稱"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerEx
						name="lvArrDate"
						label="到訪日期"
						validate
						clearable
						fullWidth
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={5} md={5} lg={4} >
					<OrderDirPicker
						label="到訪日期排序"
						name="lvArrDateDir"
						disableOpenOnInput
						selectOnFocus
					// disableClearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4} >
					<DatePickerEx
						name="lvOrdDate"
						label="訂訪日期"
						validate
						clearable
					/>
				</ResponsiveGrid>

			</ResponsiveGrid>
		</FormBox>
	);
})

P41SearchForm.propTypes = {

}

P41SearchForm.displayName = "P41SearchForm";
export default P41SearchForm;


