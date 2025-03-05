import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { U01FrameContainer } from "@/modules/U01/U01FrameContainer";
import { U01Provider } from "@/modules/U01/U01Provider";
// import { U02FrameContainer } from "@/modules/U02/U02FrameContainer";
// import { U02Provider } from "@/modules/U02/U02Provider";
// import { U03FrameContainer } from "@/modules/U03/U03FrameContainer";
// import { U03Provider } from "@/modules/U03/U03Provider";
import { U04FrameContainer } from "@/modules/U04/U04FrameContainer";
import { U04Provider } from "@/modules/U04/U04Provider";
import { U05FrameContainer } from "@/modules/U05/U05FrameContainer";
import { U05Provider } from "@/modules/U05/U05Provider";
import { U05_1FrameContainer } from "@/modules/U05_1/U05_1FrameContainer";
import { U05_1Provider } from "@/modules/U05_1/U05_1Provider";
import { U06FrameContainer } from "@/modules/U06/U06FrameContainer";
import { U06Provider } from "@/modules/U06/U06Provider";
import { U061Provider } from "@/modules/U06_1/U06_1Provider";
// import { U07FrameContainer } from "@/modules/U07/U07FrameContainer";
// import { U07Provider } from "@/modules/U07/U07Provider";
// import { U08FrameContainer } from "@/modules/U08/U08FrameContainer";
// import { U08Provider } from "@/modules/U08/U08Provider";
import { U061FrameContainer } from "@/pages/modules/U061/U061FrameContainer";
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
		{/* <Route
			path="U02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U02Provider>
							<U02FrameContainer />
						</U02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U03Provider>
							<U03FrameContainer />
						</U03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/> */}
		<Route
			path="U04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U04Provider>
							<U04FrameContainer />
						</U04Provider>
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
						<U05_1Provider>
							<U05_1FrameContainer />
						</U05_1Provider>
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
		{/* <Route
			path="U07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U07Provider>
							<U07FrameContainer />
						</U07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="U08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U08Provider>
							<U08FrameContainer />
						</U08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/> */}
	</>
);

export default uRoutes;
