import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { ZA03Provider } from "@/contexts/ZA03/ZA03Provider";
import { REBFrameContainer } from "@/modules/REB/REBFrameContainer";
import { REBProvider } from "@/modules/REB/REBProvider";
import { ZA03FrameContainer } from "@/pages/jobs/ZA03/ZA03FrameContainer";
import { Route } from "react-router-dom";

const sysRoutes = (
	<>
		<Route
			path="ZA03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<ZA03Provider>
							<ZA03FrameContainer />
						</ZA03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="REB"
			element={
				<CrudProvider>
					<REBProvider>
						<REBFrameContainer />
					</REBProvider>
				</CrudProvider>
			}
		/>

	</>
)

export default sysRoutes;