import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { P14FrameContainer } from "@/modules/P14/P14FrameContainer";
import { P14Provider } from "@/modules/P14/P14Provider";
import { Route } from "react-router-dom";

const pRoutes2 = (
	<>
		<Route
			path="P14"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P14Provider>
							<P14FrameContainer />
						</P14Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>


	</>
);

export default pRoutes2;
