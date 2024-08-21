import { useContext } from "react";
import LockSwitch from "../../../../shared-components/LockSwitch";
import { DSGTest4Context } from "./DSGTest4Context";

const DSGTest4LockSwitch = (props) => {
	const { ...rest } = props;
	const dsgTest4 = useContext(DSGTest4Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={dsgTest4.grid.readOnly}
			onChange={dsgTest4.grid.toggleReadOnly}
			{...rest}
		/>
	);
}

DSGTest4LockSwitch.propTypes = {

}

DSGTest4LockSwitch.displayName = "DSGTest4LockSwitch";
export default DSGTest4LockSwitch;