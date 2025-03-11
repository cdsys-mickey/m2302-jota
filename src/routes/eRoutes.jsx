import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { E01Provider } from "@/contexts/E01/E01Provider";
import { E03Provider } from "@/contexts/E03/E03Provider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { E01FrameContainer } from "@/pages/modules/E01/E01FrameContainer";
import { E021FrameContainer } from "@/modules/E021/E021FrameContainer";
import { E03FrameContainer } from "@/pages/modules/E03/E03FrameContainer";
import { Route } from "react-router-dom";
import { E021Provider } from "@/modules/E021/E021Provider";
import { E02Provider } from "@/modules/E021/E02Provider";

const eRoutes = (
	<>
		<Route
			path="E01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<E01Provider>
							<E01FrameContainer />
						</E01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="E02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<E02Provider>
							<E021FrameContainer />
						</E02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="E021"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<E021Provider>
							<E021FrameContainer />
						</E021Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="E03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<E03Provider>
							<E03FrameContainer />
						</E03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default eRoutes;
