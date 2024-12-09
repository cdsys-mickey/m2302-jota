import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { U01Provider } from "@/contexts/U01/U01Provider";
import { U05Provider } from "@/contexts/U05/U05Provider";
import { U051Provider } from "@/contexts/U051/U051Provider";
import { U06Provider } from "@/contexts/U06/U06Provider";
import { U061Provider } from "@/contexts/U061/U061Provider";
import { U01FrameContainer } from "@/pages/U01/U01FrameContainer";
import { U05FrameContainer } from "@/pages/U05/U05FrameContainer";
import { U051FrameContainer } from "@/pages/U051/U051FrameContainer";
import { U06FrameContainer } from "@/pages/U06/U06FrameContainer";
import { U061FrameContainer } from "@/pages/U061/U061FrameContainer";
import { Route } from "react-router-dom";

const uRoutes = (
	<>
		<Route
			path="U01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U01Provider>
							<U01FrameContainer />
						</U01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U05Provider>
							<U05FrameContainer />
						</U05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U051"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U051Provider>
							<U051FrameContainer />
						</U051Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U06Provider>
							<U06FrameContainer />
						</U06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U061"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U061Provider>
							<U061FrameContainer />
						</U061Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default uRoutes;
