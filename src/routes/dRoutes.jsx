import { Route } from "react-router-dom";
import { D01Provider } from "../contexts/D01/D01Provider";
import { D02Provider } from "../contexts/D02/D02Provider";
import { D041Provider } from "../contexts/D041/D041Provider";
import { D05Provider } from "../contexts/D05/D05Provider";
import { D06Provider } from "../contexts/D06/D06Provider";
import { D07Provider } from "../contexts/D07/D07Provider";

import { D01FrameContainer } from "../pages/jobs/D01/D01FrameContainer";
import { D02FrameContainer } from "../pages/jobs/D02/D02FrameContainer";
import { D041FrameContainer } from "../pages/jobs/D04/D041FrameContainer";
import { D05FrameContainer } from "../pages/jobs/D05/D05FrameContainer";
import { D06FrameContainer } from "../pages/jobs/D06/D06FrameContainer";
import { D07FrameContainer } from "../pages/jobs/D07/D07FrameContainer";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";

const dRoutes = (
	<>
		<Route
			path="D01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D01Provider>
							<D01FrameContainer />
						</D01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="D02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D02Provider>
							<D02FrameContainer />
						</D02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="D041"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D041Provider>
							<D041FrameContainer />
						</D041Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="D05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D05Provider>
							<D05FrameContainer />
						</D05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="D06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D06Provider>
							<D06FrameContainer />
						</D06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="D07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<D07Provider>
							<D07FrameContainer />
						</D07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default dRoutes;
