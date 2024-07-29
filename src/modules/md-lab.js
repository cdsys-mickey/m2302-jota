import { DSGTest2Container } from "../pages/lab/dsg/DSGTest2Container";
import DSGTest4Page from "../pages/lab/dsg/test4/DSGTest4Page";
import { InputTestContainer } from "../pages/lab/input-test/InputTestContainer";
import SignalRTest from "../pages/lab/SignalRTest";
const Tabs = [
	{
		label: "Inputs",
		value: "input-test",
		Component: InputTestContainer,
	},
	{ label: "DSG4", value: "dsg", Component: DSGTest4Page },
	{ label: "DSG2", value: "dsg2", Component: DSGTest2Container },
	{ label: "SignalR", value: "signal-r", Component: SignalRTest },
];

const Lab = {
	Tabs,
};

export default Lab;
