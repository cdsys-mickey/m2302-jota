import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { G01FrameContainer } from "@/modules/G01/G01FrameContainer";
import { G01Provider } from "@/modules/G01/G01Provider";
import { G02FrameContainer } from "@/modules/G02/G02FrameContainer";
import { G02Provider } from "@/modules/G02/G02Provider";
import { G04FrameContainer } from "@/modules/G04/G04FrameContainer";
import { G04Provider } from "@/modules/G04/G04Provider";
import { G05FrameContainer } from "@/modules/G05/G05FrameContainer";
import { G05Provider } from "@/modules/G05/G05Provider";
import { G10FrameContainer } from "@/pages/modules/G10/G10FrameContainer";
import { G10Provider } from "@/pages/modules/G10/G10Provider";
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
		{/* <Route
			path="G04"
			element={
				<CrudProvider>
					<G04Provider>
						<G04FrameContainer />
					</G04Provider>
				</CrudProvider>
			}
		/> */}
		<Route
			path="G05"
			element={
				<CrudProvider>
					<G05Provider>
						<G05FrameContainer />
					</G05Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="G10"
			element={
				<CrudProvider>
					<G10Provider>
						<G10FrameContainer />
					</G10Provider>
				</CrudProvider>
			}
		/>
	</>
);

export default gRoutes;
