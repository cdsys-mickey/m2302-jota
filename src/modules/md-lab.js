import DSGTest from "../pages/lab/dsg/DSGTest";
import { DSGTest2Container } from "../pages/lab/dsg/DSGTest2Container";
import { DSGTest4Container } from "../pages/lab/dsg/DSGTest4Container";
import { DSGTestContainer } from "../pages/lab/dsg/DSGTestContainer";
import LockSwitchTest from "../pages/lab/lock-switch/LockSwitchTest";
import { OptionPickerTestContainer } from "../pages/lab/option-picker/OptionPickerTestContainer";
import SignalRTest from "../pages/lab/SignalRTest";

const Tabs = [
	{
		label: "Inputs",
		value: "option-picker",
		component: OptionPickerTestContainer,
	},
	{ label: "DSG", value: "dsg", component: DSGTest4Container },
	{ label: "DSG2", value: "dsg2", component: DSGTest2Container },
	{ label: "SignalR", value: "signal-r", component: SignalRTest },
];

const Lab = {
	Tabs,
};

export default Lab;
