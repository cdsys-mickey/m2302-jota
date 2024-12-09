import { Route } from "react-router-dom";

import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { C02Provider } from "@/contexts/C02/C02Provider";
import { C02FrameContainer } from "@/pages/C02/C02FrameContainer";
import { C01Provider } from "@/contexts/C01/C01Provider";
import { C01FrameContainer } from "@/pages/C01/C01FrameContainer";
import { C04Provider } from "@/contexts/C04/C04Provider";
import { C04FrameContainer } from "@/pages/C04/C04FrameContainer";
import { C03Provider } from "@/contexts/C03/C03Provider";
import { C03FrameContainer } from "@/pages/C03/C03FrameContainer";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { C05FrameContainer } from "@/pages/C05/C05FrameContainer";
import { C06FrameContainer } from "@/pages/C06/C06FrameContainer";
import { C07FrameContainer } from "@/pages/C07/C07FrameContainer";
import { C05Provider } from "@/contexts/C05/C05Provider";
import { C06Provider } from "@/contexts/C06/C06Provider";
import { C07Provider } from "@/contexts/C07/C07Provider";
import { C08FrameContainer } from "../pages/C08/C08FrameContainer";
import { C09FrameContainer } from "../pages/C09/C09FrameContainer";
import { C08Provider } from "../contexts/C08/C08Provider";
import { C09Provider } from "../contexts/C09/C09Provider";

const cRoutes = (
	<>
		<Route
			path="C01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C01Provider>
							<C01FrameContainer />
						</C01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C02Provider>
							<C02FrameContainer />
						</C02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C03Provider>
							<C03FrameContainer />
						</C03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C04Provider>
							<C04FrameContainer />
						</C04Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C05Provider>
							<C05FrameContainer />
						</C05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

		<Route
			path="C06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C06Provider>
							<C06FrameContainer />
						</C06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C07Provider>
							<C07FrameContainer />
						</C07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C08Provider>
							<C08FrameContainer />
						</C08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="C09"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<C09Provider>
							<C09FrameContainer />
						</C09Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default cRoutes;
