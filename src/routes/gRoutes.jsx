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
import { G06FrameContainer } from "@/modules/G06/G06FrameContainer";
import { G06Provider } from "@/modules/G06/G06Provider";
import { G07FrameContainer } from "@/modules/G07/G07FrameContainer";
import { G07Provider } from "@/modules/G07/G07Provider";
import { G08FrameContainer } from "@/modules/G08/G08FrameContainer";
import { G08Provider } from "@/modules/G08/G08Provider";
import { G09FrameContainer } from "@/modules/G09/G09FrameContainer";
import { G09Provider } from "@/modules/G09/G09Provider";
import { G10FrameContainer } from "@/pages/jobs/G10/G10FrameContainer";
import { G10Provider } from "@/pages/jobs/G10/G10Provider";
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
		<Route
			path="G04"
			element={
				<CrudProvider>
					<G04Provider>
						<G04FrameContainer />
					</G04Provider>
				</CrudProvider>
			}
		/>
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
			path="G06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<G06Provider>
							<G06FrameContainer />
						</G06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="G07"
			element={
				<CrudProvider>
					<G07Provider>
						<G07FrameContainer />
					</G07Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="G08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<G08Provider>
							<G08FrameContainer />
						</G08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="G09"
			element={
				<CrudProvider>
					<G09Provider>
						<G09FrameContainer />
					</G09Provider>
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
