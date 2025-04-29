import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { F01Provider } from "@/modules/F01/F01Provider";
import { F02Provider } from "@/pages/modules/F02/F02Provider";
import { F03Provider } from "@/contexts/F03/F03Provider";
import { F04Provider } from "@/contexts/F04/F04Provider";
import { F05Provider } from "@/contexts/F05/F05Provider";
import { F06Provider } from "@/contexts/F06/F06Provider";
import { F07Provider } from "@/contexts/F07/F07Provider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { F01FrameContainer } from "@/modules/F01/F01FrameContainer";
import { F02FrameContainer } from "@/pages/modules/F02/F02FrameContainer";
import { F03FrameContainer } from "@/pages/modules/F03/F03FrameContainer";
import { F04FrameContainer } from "@/pages/modules/F04/F04FrameContainer";
import { F05FrameContainer } from "@/pages/modules/F05/F05FrameContainer";
import { F06FrameContainer } from "@/pages/modules/F06/F06FrameContainer";
import { F07FrameContainer } from "@/pages/modules/F07/F07FrameContainer";
import { Route } from "react-router-dom";

const fRoutes = (
	<>
		<Route
			path="F01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F01Provider>
							<F01FrameContainer />
						</F01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F02Provider>
							<F02FrameContainer />
						</F02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F03Provider>
							<F03FrameContainer />
						</F03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F04Provider>
							<F04FrameContainer />
						</F04Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F05Provider>
							<F05FrameContainer />
						</F05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F06Provider>
							<F06FrameContainer />
						</F06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="F07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<F07Provider>
							<F07FrameContainer />
						</F07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default fRoutes;
