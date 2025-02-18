import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";
import { P02Provider } from "@/contexts/P02/P02Provider";
import { P02FrameContainer } from "@/pages/modules/P02/P02FrameContainer";
import { P04Provider } from "@/contexts/P04/P04Provider";
import { P04FrameContainer } from "@/pages/modules/P04/P04FrameContainer";

const pRoutes2 = (
	<>
		{/* <Route
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
		/> */}


	</>
);

export default pRoutes2;
