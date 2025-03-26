import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { memo } from "react";

const A19InOutCheckboxView = memo((props) => {
	const { ...rest } = props;
	return (
		<CheckboxExWrapper
			label="包含撥出入"
			defaultValue={true}
			{...rest}
		/>
	);
})

A19InOutCheckboxView.propTypes = {

}

A19InOutCheckboxView.displayName = "A19InOutCheckboxView";
export default A19InOutCheckboxView;