import { memo } from "react";
import PropTypes from "prop-types";
import { CheckboxEx } from "@/shared-components";

const P42CndPayCheckboxViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<CheckboxEx
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