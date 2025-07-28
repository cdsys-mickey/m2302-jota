import { memo } from "react";
import PropTypes from "prop-types";
import { CheckboxEx } from "@/shared-components";

const P42DrvPayCheckboxViewComponent = (props) => {
	const { editing, ...rest } = props;
	return (
		<CheckboxEx
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