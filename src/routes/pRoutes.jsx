import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";
import { P02Provider } from "@/contexts/P02/P02Provider";
import { P02FrameContainer } from "@/pages/modules/P02/P02FrameContainer";
import { P04Provider } from "@/contexts/P04/P04Provider";
import { P04FrameContainer } from "@/pages/modules/P04/P04FrameContainer";
import { U07Provider } from "@/modules/U07/U07Provider";
import { U07FrameContainer } from "@/modules/U07/U07FrameContainer";
import { U08Provider } from "@/modules/U08/U08Provider";
import { U08FrameContainer } from "@/modules/U08/U08FrameContainer";

const pRoutes = (
	<>
		<Route
			path="P02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P02Provider>
							<P02FrameContainer />
						</P02Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P04Provider>
							<P04FrameContainer />
						</P04Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

		<Route
			path="P07"
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
			path="P08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<U08Provider>
							<U08FrameContainer />
						</U08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default pRoutes;
