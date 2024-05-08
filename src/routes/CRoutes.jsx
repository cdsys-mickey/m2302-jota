import { Route } from "react-router-dom";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { C02Provider } from "@/contexts/C02/C02Provider";
import { C02FrameContainer } from "@/pages/C02/C02FrameContainer";
import { C01Provider } from "@/contexts/C01/C01Provider";
import { C01FrameContainer } from "@/pages/C01/C01FrameContainer";
import { C04Provider } from "@/contexts/C04/C04Provider";
import { C04FrameContainer } from "@/pages/C04/C04FrameContainer";
import { C03Provider } from "@/contexts/C03/C03Provider";
import { C03FrameContainer } from "@/pages/C03/C03FrameContainer";

const CRoutes = (props) => {
	const { ...rest } = props;
	return (
		<>
			<Route
				path="C01"
				element={
					<CrudProvider>
						<C01Provider>
							<C01FrameContainer />
						</C01Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="C02"
				element={
					<CrudProvider>
						<C02Provider>
							<C02FrameContainer />
						</C02Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="C03"
				element={
					<CrudProvider>
						<C03Provider>
							<C03FrameContainer />
						</C03Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="C04"
				element={
					<CrudProvider>
						<C04Provider>
							<C04FrameContainer />
						</C04Provider>
					</CrudProvider>
				}
			/>
		</>
	);
};

CRoutes.propTypes = {};

CRoutes.displayName = "CRoutes";
export default CRoutes;
