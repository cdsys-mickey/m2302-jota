import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";

import { H01FrameContainer } from "@/modules/H01/H01FrameContainer";
import { H01Provider } from "@/modules/H01/H01Provider";
import { H02FrameContainer } from "@/modules/H02/H02FrameContainer";
import { H02Provider } from "@/modules/H02/H02Provider";
import { H03Provider } from "@/modules/H03/H03Provider";
import { H03FrameContainer } from "@/modules/H03/H03FrameContainer";
import { H04Provider } from "@/modules/H04/H04Provider";
import { H04FrameContainer } from "@/modules/H04/H04FrameContainer";

const hRoutes = (
	<>
		<Route
			path="H01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H01Provider>
							<H01FrameContainer />
						</H01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H02Provider>
							<H02FrameContainer />
						</H02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H03Provider>
							<H03FrameContainer />
						</H03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		{/* <Route
			path="H04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H04Provider>
							<H04FrameContainer />
						</H04Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/> */}
	</>
);

export default hRoutes;
