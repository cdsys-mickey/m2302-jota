import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import LockSwitch from "../../../shared-components/LockSwitch";
import { useToggle } from "../../../shared-hooks/useToggle";

const LockSwitchTest = memo((props) => {
	const { ...rest } = props;
	const [checked, toggleChecked] = useToggle(false);

	return (
		<Box p={4}>
			<LockSwitch checked={checked} onChange={toggleChecked} />
		</Box>
	);
});

LockSwitchTest.propTypes = {};

LockSwitchTest.displayName = "LockSwitchTest";
export default LockSwitchTest;
