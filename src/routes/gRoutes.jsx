import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { G01FrameContainer } from "@/modules/G01/G01FrameContainer";
import { G01Provider } from "@/modules/G01/G01Provider";
import { G02FrameContainer } from "@/modules/G02/G02FrameContainer";
import { G02Provider } from "@/modules/G02/G02Provider";
import { Route } from "react-router-dom";

const gRoutes = (
	<>
		<Route
			path="G01"
			element={
				<CrudProvider>
					<G01Provider>
						<G01FrameContainer />
					</G01Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="G02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<G02Provider>
							<G02FrameContainer />
						</G02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default gRoutes;
