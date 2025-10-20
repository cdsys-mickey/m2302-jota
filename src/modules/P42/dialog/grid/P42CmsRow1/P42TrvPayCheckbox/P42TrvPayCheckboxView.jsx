import { CheckboxExField } from "@/shared-components";
import PropTypes from "prop-types";
import { memo } from "react";

const P42TrvPayCheckboxViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<CheckboxExField
			// typo
			disabled={!editing}
			// variant="outlined"
			fullWidth
			dense
			// shrink
			// label="已發"
			tooltip="旅行社佣金已發"
			defaultValue={false}
			size="small"
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

P42TrvPayCheckboxViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P42TrvPayCheckboxView = memo(P42TrvPayCheckboxViewComponent);
export default P42TrvPayCheckboxView;