import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";
import { P02Provider } from "@/contexts/P02/P02Provider";
import { P02FrameContainer } from "@/pages/modules/P02/P02FrameContainer";
import { P16Provider } from "@/contexts/P16/P16Provider";
import { P16FrameContainer } from "@/pages/modules/P16/P16FrameContainer";

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
			path="P16"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P16Provider>
							<P16FrameContainer />
						</P16Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default pRoutes;
