import StdPrint from "@/modules/StdPrint.mjs";
import DropDownButton from "@/shared-components/DropDownButton";
import PropTypes from "prop-types";
import DebugDialogButtonContainer from "../debug/DebugDialogButtonContainer";

const PrintButton = (props) => {
	const { onDebugSubmit, onItemClick, onSelect, onClick, ...rest } = props;

	return (
		<DropDownButton
			split
			dense
			excludeSelected
			hoverIconToOpen
			variant="text"
			noGutter
			color="neutral-dark"
			label="列印方式"
			options={StdPrint.options}
			getLabel={StdPrint.getOptionLabel}
			defaultSelected={StdPrint.getDefaultOption()}
			getOptionLabel={StdPrint.getOptionLabel}
			isOptionEqualToValue={StdPrint.isOptionEqualToValue}
			getItemIconComponent={StdPrint.getIcon}
			onClick={onClick || onSelect}
			onItemClick={onItemClick || onSelect}
			slotProps={{
				paper: {
					elevation: 8
				}
			}}
			{...(onDebugSubmit && {
				leftButtons: <DebugDialogButtonContainer onClick={onDebugSubmit} />
			})}
			{...rest}
		/>
	);
}

PrintButton.propTypes = {
	onDebugSubmit: PropTypes.func,
	onClick: PropTypes.func,
	onItemClick: PropTypes.func,
	onSelect: PropTypes.func,
}

PrintButton.displayName = "PrintButton";
export default PrintButton;