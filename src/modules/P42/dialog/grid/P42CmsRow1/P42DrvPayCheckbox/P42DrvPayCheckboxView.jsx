import { CheckboxExField } from "@/shared-components";
import PropTypes from "prop-types";
import { memo } from "react";

const P42DrvPayCheckboxViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<CheckboxExField
			// typo
			disabled={!editing}
			fullWidth
			dense
			defaultValue={false}
			size="small"
			tooltip="司機佣金已發"
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

P42DrvPayCheckboxViewComponent.propTypes = {
	editing: PropTypes.bool
}
const P42DrvPayCheckboxView = memo(P42DrvPayCheckboxViewComponent);
export default P42DrvPayCheckboxView;