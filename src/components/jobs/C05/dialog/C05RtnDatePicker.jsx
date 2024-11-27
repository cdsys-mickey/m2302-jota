import { C05Context } from "@/contexts/C05/C05Context";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { useMemo } from "react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const C05RtnDatePickerContainer = (props) => {
	const { ...rest } = props;
	const c05 = useContext(C05Context);
	const form = useFormContext();

	const handleChanged = useMemo(() => {
		console.log("handleChanged");
		return c05.handleRtnDateChanged({ setValue: form.setValue, getValues: form.getValues, })
	}, [c05, form.getValues, form.setValue])

	return (
		<DatePickerWrapper
			// onBlur={handleChanged}
			// onAccept={handleAccept}
			onChanged={handleChanged}
			{...rest}
		/>
	)
}

C05RtnDatePickerContainer.displayName = "C05RtnDatePickerContainer";
export default C05RtnDatePickerContainer;