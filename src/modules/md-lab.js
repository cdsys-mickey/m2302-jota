import LockSwitchTest from "../pages/lab/lock-switch/LockSwitchTest";
import { OptionPickerTestContainer } from "../pages/lab/option-picker/OptionPickerTestContainer";
import SignalRTest from "../pages/lab/SignalRTest";

const Tabs = [
	{
		label: "Inputs",
		value: "option-picker",
		component: OptionPickerTestContainer,
	},
	{ label: "LockSwitch", value: "lock-switch", component: LockSwitchTest },
	{ label: "SignalR", value: "signal-r", component: SignalRTest },
];

const Lab = {
	Tabs,
};

export default Lab;
