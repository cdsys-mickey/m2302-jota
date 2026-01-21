import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const G10ListForm = memo((props) => {
	const { ...rest } = props;

	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item md={6}>
					<DatePickerWrapper minDate={"2026/01/01"}
						label="盤點日期"
						inline
						typo
						name="ActDate"
						editing={false}
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

G10ListForm.propTypes = {

}

G10ListForm.displayName = "G10ListForm";
export default G10ListForm;





