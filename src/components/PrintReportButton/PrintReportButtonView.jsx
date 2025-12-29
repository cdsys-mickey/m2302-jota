import StdPrint from "@/modules/StdPrint.mjs";
import { DropDownButton } from "shared-components";
import PropTypes from "prop-types";
import DebugReportButton from "@/components/DebugReportButton";


const PrintReportButtonView = (props) => {
	const { onDebugSubmit, onItemClick, onSelect, onClick, variant = "text", ...rest } = props;

	return (
		<DropDownButton
			split
			dense
			excludeSelected
			hoverIconToOpen
			// variant="text"
			variant={variant}
			noGutter
			color="neutral-dark"
			label="列印方式"
			options={StdPrint.options}
			getLabel={StdPrint.getOptionLabel}
			defaultSelected={StdPrint.getDefaultOption()}
			getOptionLabel={StdPrint.getOptionLabel}
			isOptionEqualToValue={StdPrint.isOptionEqualToValue}
			getItemIconComponent={StdPrint.getIcon}
			getOptionKey={StdPrint.getOptionKey}
			onClick={onClick || onSelect}
			onItemClick={onItemClick || onSelect}
			slotProps={{
				paper: {
					elevation: 8
				}
			}}
			{...(onDebugSubmit && {
				leftButtons: <DebugReportButton variant={variant} onClick={onDebugSubmit} />
			})}
			title="Ctrl-Enter"
			{...rest}
		/>
	);
}

PrintReportButtonView.propTypes = {
	onDebugSubmit: PropTypes.func,
	onClick: PropTypes.func,
	onItemClick: PropTypes.func,
	onSelect: PropTypes.func,
	variant: PropTypes.string
}

PrintReportButtonView.displayName = "PrintReportButtonView";
export default PrintReportButtonView;