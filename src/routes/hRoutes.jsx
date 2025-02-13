import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { Route } from "react-router-dom";

import { H01FrameContainer } from "@/modules/H01/H01FrameContainer";
import { H01Provider } from "@/modules/H01/H01Provider";
import { H02FrameContainer } from "@/modules/H02/H02FrameContainer";
import { H02Provider } from "@/modules/H02/H02Provider";
import { H03Provider } from "@/modules/H03/H03Provider";
import { H03FrameContainer } from "@/modules/H03/H03FrameContainer";
import { H04Provider } from "@/modules/H04/H04Provider";
import { H04FrameContainer } from "@/modules/H04/H04FrameContainer";
import { H05Provider } from "@/modules/H05/H05Provider";
import { H05FrameContainer } from "@/modules/H05/H05FrameContainer";
import { H06Provider } from "@/modules/H06/H06Provider";
import { H06FrameContainer } from "@/modules/H06/H06FrameContainer";
import { H07Provider } from "@/modules/H07/H07Provider";
import { H07FrameContainer } from "@/modules/H07/H07FrameContainer";
import { H08Provider } from "@/modules/H08/H08Provider";
import { H08FrameContainer } from "@/modules/H08/H08FrameContainer";
import { H10Provider } from "@/modules/H10/H10Provider";
import { H10FrameContainer } from "@/modules/H10/H10FrameContainer";
import { H11Provider } from "@/modules/H11/H11Provider";
import { H11FrameContainer } from "@/modules/H11/H11FrameContainer";
import { H13Provider } from "@/modules/H13/H13Provider";
import { H13FrameContainer } from "@/modules/H13/H13FrameContainer";
import { H14_1Provider } from "@/modules/H14-1/H14_1Provider";
import { H14_1FrameContainer } from "@/modules/H14-1/H14_1FrameContainer";
import { H15Provider } from "@/modules/H15/H15Provider";
import { H15FrameContainer } from "@/modules/H15/H15FrameContainer";
import { H16Provider } from "@/modules/H16/H16Provider";
import { H16FrameContainer } from "@/modules/H16/H16FrameContainer";
import { H17Provider } from "@/modules/H17/H17Provider";
import { H17FrameContainer } from "@/modules/H17/H17FrameContainer";
import { H21Provider } from "@/modules/H21/H21Provider";
import { H21FrameContainer } from "@/modules/H21/H21FrameContainer";
import { H22Provider } from "@/modules/H22/H22Provider";
// import { lazy } from "react";
import H22FrameContainer from "@/modules/H22/H22FrameContainer";
import { H24Provider } from "@/modules/H24/H24Provider";
import { H24FrameContainer } from "@/modules/H24/H24FrameContainer";
import { H25Provider } from "@/modules/H25/H25Provider";
import { H25FrameContainer } from "@/modules/H25/H25FrameContainer";
// const H22FrameContainer = lazy(() => import("@/modules/H22/H22FrameContainer"));



const hRoutes = (
	<>
		<Route
			path="H01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H01Provider>
							<H01FrameContainer />
						</H01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H02Provider>
							<H02FrameContainer />
						</H02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H03Provider>
							<H03FrameContainer />
						</H03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H04Provider>
							<H04FrameContainer />
						</H04Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H05Provider>
							<H05FrameContainer />
						</H05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H06Provider>
							<H06FrameContainer />
						</H06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H07Provider>
							<H07FrameContainer />
						</H07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H08Provider>
							<H08FrameContainer />
						</H08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H10"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H10Provider>
							<H10FrameContainer />
						</H10Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H11"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H11Provider>
							<H11FrameContainer />
						</H11Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H13"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H13Provider>
							<H13FrameContainer />
						</H13Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H141"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H14_1Provider>
							<H14_1FrameContainer />
						</H14_1Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H15"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H15Provider>
							<H15FrameContainer />
						</H15Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H16"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H16Provider>
							<H16FrameContainer />
						</H16Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H17"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H17Provider>
							<H17FrameContainer />
						</H17Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H21"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H21Provider>
							<H21FrameContainer />
						</H21Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H22"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H22Provider>
							<H22FrameContainer />
						</H22Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H24"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H24Provider>
							<H24FrameContainer />
						</H24Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="H25"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<H25Provider>
							<H25FrameContainer />
						</H25Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default hRoutes;
