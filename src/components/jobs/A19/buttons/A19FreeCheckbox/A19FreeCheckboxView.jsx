import { CheckboxEx } from "@/shared-components";
import { memo } from "react";

const A19FreeCheckboxView = memo((props) => {
	const { ...rest } = props;
	return (
		<CheckboxEx
			label="含試贈樣"
			defaultValue={false}
			{...rest}
		/>
	);
})

A19FreeCheckboxView.propTypes = {

}

A19FreeCheckboxView.displayName = "A19TaxCheckboxView";
export default A19FreeCheckboxView;