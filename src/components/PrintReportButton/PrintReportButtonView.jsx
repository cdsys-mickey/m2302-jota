import StdPrint from "@/modules/StdPrint.mjs";
import { DropDownButton } from "@/shared-components";
import PropTypes from "prop-types";
import DebugReportButton from "@/components/DebugReportButton";


const PrintReportButtonView = (props) => {
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
			getOptionKey={StdPrint.getOptionKey}
			onClick={onClick || onSelect}
			onItemClick={onItemClick || onSelect}
			slotProps={{
				paper: {
					elevation: 8
				}
			}}
			{...(onDebugSubmit && {
				leftButtons: <DebugReportButton onClick={onDebugSubmit} />
			})}
			// title="直接檢視 (Ctrl-Enter)"
			{...rest}
		/>
	);
}

PrintReportButtonView.propTypes = {
	onDebugSubmit: PropTypes.func,
	onClick: PropTypes.func,
	onItemClick: PropTypes.func,
	onSelect: PropTypes.func,
}

PrintReportButtonView.displayName = "PrintReportButtonView";
export default PrintReportButtonView;