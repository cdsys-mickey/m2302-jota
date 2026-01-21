import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import MatReturnOrderPicker from "@/components/picker/MatReturnOrderPicker";

const D02SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={4}>
					<MatReturnOrderPicker
						label="退料單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<EmployeePicker
						name="lvEmployee"
						label="製單人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper name="lvDate"
						label="退料日期(≧)"
						clearable
						validate
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<ProdLinePicker
						name="lvPdline"
						label="退料線別"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

D02SearchForm.propTypes = {

}

D02SearchForm.displayName = "D02SearchForm";
export default D02SearchForm;