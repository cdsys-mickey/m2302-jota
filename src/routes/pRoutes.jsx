import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";
import { P02Provider } from "@/contexts/P02/P02Provider";
import { P02FrameContainer } from "@/pages/jobs/P02/P02FrameContainer";
import { P04Provider } from "@/contexts/P04/P04Provider";
import { P04FrameContainer } from "@/pages/jobs/P04/P04FrameContainer";
import { U07Provider } from "@/modules/U07/U07Provider";
import { U07FrameContainer } from "@/modules/U07/U07FrameContainer";
import { U08Provider } from "@/modules/U08/U08Provider";
import { U08FrameContainer } from "@/modules/U08/U08FrameContainer";
import { P03Provider } from "@/modules/P03/P03Provider";
import { P03FrameContainer } from "@/modules/P03/P03FrameContainer";
import { P09Provider } from "@/modules/P09/P09Provider";
import { P09FrameContainer } from "@/modules/P09/P09FrameContainer";
import { P10Provider } from "@/modules/P10/P10Provider";
import { P10FrameContainer } from "@/modules/P10/P10FrameContainer";
import { P15Provider } from "@/modules/P15/P15Provider";
import { P15FrameContainer } from "@/modules/P15/P15FrameContainer";

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
			path="P03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P03Provider>
							<P03FrameContainer />
						</P03Provider>

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
		<Route
			path="P09"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P09Provider>
							<P09FrameContainer />
						</P09Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P10"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P10Provider>
							<P10FrameContainer />
						</P10Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P15"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P15Provider>
							<P15FrameContainer />
						</P15Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

	</>
);

export default pRoutes;
