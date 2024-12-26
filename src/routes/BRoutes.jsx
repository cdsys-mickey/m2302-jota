import { Route } from "react-router-dom";
import { CrudProvider } from "../contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";

import { BProvider } from "@/contexts/B/BProvider";
import { B011Provider } from "@/contexts/B011/B011Provider";
import { B012Provider } from "@/contexts/B012/B012Provider";
import { B02Provider } from "@/contexts/B02/B02Provider";
import { B031Provider } from "@/contexts/B031/B031Provider";
import { B032Provider } from "@/contexts/B032/B032Provider";
import { B04Provider } from "@/contexts/B04/B04Provider";
import { B05Provider } from "@/contexts/B05/B05Provider";
import { B06Provider } from "@/contexts/B06/B06Provider";
import { B011FrameContainer } from "@/pages/modules/B011/B011FrameContainer";
import { B012FrameContainer } from "@/pages/modules/B012/B012FrameContainer";
import { B02FrameContainer } from "@/pages/modules/B02/B02FrameContainer";
import { B05FrameContainer } from "@/pages/modules/B05/B05FrameContainer";
import { B06FrameContainer } from "@/pages/modules/B06/B06FrameContainer";

const bRoutes = (
	<>
		<Route
			path="B011"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider>
							<B011Provider>
								<B011FrameContainer />
							</B011Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

		<Route
			path="B012"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider >
							<B012Provider>
								<B012FrameContainer />
							</B012Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider>
							<B02Provider>
								<B02FrameContainer />
							</B02Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B031"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider forNew>
							<B031Provider>
								<B011FrameContainer />
							</B031Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B032"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider forNew>
							<B032Provider>
								<B012FrameContainer />
							</B032Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<BProvider forNew>
							<B04Provider>
								<B02FrameContainer />
							</B04Provider>
						</BProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<B05Provider>
							<B05FrameContainer />
						</B05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="B06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<B05Provider>
							<B06Provider>
								<B06FrameContainer />
							</B06Provider>
						</B05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default bRoutes;
