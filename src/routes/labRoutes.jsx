import DialogsTest from "@/pages/lab/DialogsTest";
import DSGTest3 from "@/pages/lab/dsg/DSGTest3";
import { DSGTestContainer } from "@/pages/lab/dsg/DSGTestContainer";
import { DSGTestProvider } from "@/pages/lab/dsg/DSGTestProvider";
import SignalRTest from "@/pages/lab/SignalRTest";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import { DialogsProvider } from "@/shared-contexts/dialog/DialogsProvider";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { KitchenSinkContainer } from "@/pages/lab/KitchenSinkContainer";
import { DSGTest2Container } from "@/pages/lab/dsg/DSGTest2Container";

const labRoutes = (
	<>
		<Route path="lab">
			<Route path="loading" element={<LoadingFrame />} />
			{/* <Route path="lock-switch" element={<LockSwitchTest />} /> */}
			<Route
				path="dsg"
				element={
					<DSGTestProvider>
						<DSGTestContainer />
					</DSGTestProvider>
				}
			/>
			<Route path="dsg3" element={<DSGTest3 />} />
			<Route path="signalr" element={<SignalRTest />} />
			<Route
				path="dialogs"
				element={
					<DialogsProvider>
						<DialogsTest />
					</DialogsProvider>
				}
			/>
		</Route>
		<Route path="lab-protected" element={<ProtectedRoute />}>
			<Route path="kitchen-sink" element={<KitchenSinkContainer />} />
			<Route path="dsg" element={<DSGTest2Container />} />
			{/* <Route path="option-picker" element={<OptionPickerTest />} /> */}
		</Route>
	</>
)

export default labRoutes;