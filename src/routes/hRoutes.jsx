import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";

import { H01FrameContainer } from "@/pages/modules/H01/H01FrameContainer";
import { H02FrameContainer } from "@/pages/modules/H02/H02FrameContainer";
import { H01Provider } from "@/contexts/H01/H01Provider";
import { H02Provider } from "@/contexts/H02/H02Provider";

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
	</>
);

export default hRoutes;
