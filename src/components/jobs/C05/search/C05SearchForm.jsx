import EmployeePicker from "@/components/picker/EmployeePicker";
import ReturnOrderPicker from "@/components/picker/ReturnOrderPicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import RangeGroup from "@/shared-components/RangeGroup";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import ResponsiveLineBreak from "@/shared-components/responsive-grid/ResponsiveLineBreak";
import { memo } from "react";

const C05SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={5}>
					{/* <TextFieldWrapper
						label="單號"
						name="q"
						size="small"
						fullWidth
						autoFocus
						clearable
						clearOnEscape
					/> */}
					<ReturnOrderPicker
						label="退貨單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={6}>
					<SupplierPicker
						label="廠商代碼"
						name="lvSupplier"
						variant="outlined"
						optionLabelSize="md"
						virtualize
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				{/* 
				<ResponsiveGrid item sm={24}>
					<TextFieldWrapper
						name="spn"
						label="廠商名稱"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={24}>
					<TextFieldWrapper
						name="spa"
						label="廠商地址"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={24}>
					<TextFieldWrapper
						name="spu"
						label="統一編號"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={24}>
					<TextFieldWrapper
						name="inv"
						label="發票號碼"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={24}>
					<TaxType2Picker name="taxType" label="稅外加" disableOpenOnInput />
				</ResponsiveGrid>
				*/}
				<ResponsiveGrid item md={12} lg={8}>
					<RangeGroup legend="退貨日期區間"
						leftComponent={<DatePickerWrapper
							name="rd"
							label="退貨日期"
							validate
							clearable
							borderless
							placeholder="起"
						/>}
						rightComponent={<DatePickerWrapper
							name="rd2"
							label="退貨日期迄"
							validate
							clearable
							borderless
							placeholder="迄"
						/>}
					/>
				</ResponsiveGrid>
				<ResponsiveLineBreak md />
				<ResponsiveGrid item md={6} lg={5}>
					<EmployeePicker name="lvEmployee" label="倉管人員" disableOpenOnInput />
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>

	);
})

C05SearchForm.propTypes = {

}

C05SearchForm.displayName = "C05SearchForm";
export default C05SearchForm;