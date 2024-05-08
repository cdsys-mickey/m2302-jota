import { Route } from "react-router-dom";
import { CrudProvider } from "../contexts/crud/CrudProvider";
import { B05Provider } from "@/contexts/B05/B05Provider";
import { B05FrameContainer } from "@/pages/B05/B05FrameContainer";
import { B06Provider } from "../contexts/B06/B06Provider";
import { B06FrameContainer } from "@/pages/B06/B06FrameContainer";

const BRoutes = (props) => {
	const { ...rest } = props;
	return (
		<>
			<Route
				path="B05"
				element={
					<CrudProvider>
						<B05Provider>
							<B05FrameContainer />
						</B05Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="B06"
				element={
					<CrudProvider>
						<B06Provider>
							<B06FrameContainer />
						</B06Provider>
					</CrudProvider>
				}
			/>
		</>
	);
};

BRoutes.propTypes = {};

BRoutes.displayName = "BRoutes";
export default BRoutes;
