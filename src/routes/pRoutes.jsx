import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";
import { P02Provider } from "@/contexts/P02/P02Provider";
import { P02FrameContainer } from "@/pages/P02/P02FrameContainer";

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
	</>
);

export default pRoutes;
