import { CheckboxExField } from "@/shared-components";
import PropTypes from "prop-types";
import { memo } from "react";

const P42CndPayCheckboxViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<CheckboxExField
			// typo
			disabled={!editing}
			fullWidth
			dense
			defaultValue={false}
			size="small"
			tooltip="導遊佣金已發"
			slotProps={{
				label: {
					slotProps: {
						typography: {
							variant: "subtitle2"
						}
					},
					inline: true
				},
			}}
			{...rest}
		/>
	);
}

P42CndPayCheckboxViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P42CndPayCheckboxView = memo(P42CndPayCheckboxViewComponent);
export default P42CndPayCheckboxView;