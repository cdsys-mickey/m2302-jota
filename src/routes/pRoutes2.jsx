import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { P13FrameContainer } from "@/modules/P13/P13FrameContainer";
import { P13Provider } from "@/modules/P13/P13Provider";
import { P14FrameContainer } from "@/modules/P14/P14FrameContainer";
import { P14Provider } from "@/modules/P14/P14Provider";
import { P21FrameContainer } from "@/modules/P21/P21FrameContainer";
import { P21Provider } from "@/modules/P21/P21Provider";
import { P22FrameContainer } from "@/modules/P22/P22FrameContainer";
import { P22Provider } from "@/modules/P22/P22Provider";
import { P31FrameContainer } from "@/modules/P31/P31FrameContainer";
import { P31Provider } from "@/modules/P31/P31Provider";
import { P32FrameContainer } from "@/modules/P32/P32FrameContainer";
import { P32Provider } from "@/modules/P32/P32Provider";
import { P33FrameContainer } from "@/modules/P33/P33FrameContainer";
import { P33Provider } from "@/modules/P33/P33Provider";
import { P34FrameContainer } from "@/modules/P34/P34FrameContainer";
import { P34Provider } from "@/modules/P34/P34Provider";
import { P35FrameContainer } from "@/modules/P35/P35FrameContainer";
import { P35Provider } from "@/modules/P35/P35Provider";
import { P36FrameContainer } from "@/modules/P36/P36FrameContainer";
import { P36Provider } from "@/modules/P36/P36Provider";
import { P37FrameContainer } from "@/modules/P37/P37FrameContainer";
import P37Provider from "@/modules/P37/P37Provider";
import { P37XFrameContainer } from "@/modules/P37X/P37XFrameContainer";
import P37XProvider from "@/modules/P37X/P37XProvider";
import { P38FrameContainer } from "@/modules/P38/P38FrameContainer";
import P38Provider from "@/modules/P38/P38Provider";
import { P41FrameContainer } from "@/modules/P41/P41FrameContainer";
import { P41Provider } from "@/modules/P41/P41Provider";
import { P42FrameContainer } from "@/modules/P42/P42FrameContainer";
import { P42Provider } from "@/modules/P42/P42Provider";
import { P51FrameContainer } from "@/modules/P51/P51FrameContainer";
import { P51Provider } from "@/modules/P51/P51Provider";
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
		<Route
			path="P13"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P13Provider>
							<P13FrameContainer />
						</P13Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		{/* <Route
			path="P21"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P21Provider>
							<P21FrameContainer />
						</P21Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/> */}
		<Route
			path="P22"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P22Provider>
							<P22FrameContainer />
						</P22Provider>

					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P31"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P31Provider>
							<P31FrameContainer />
						</P31Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P32"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P32Provider>
							<P32FrameContainer />
						</P32Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P33"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P33Provider>
							<P33FrameContainer />
						</P33Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P34"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P34Provider>
							<P34FrameContainer />
						</P34Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P35"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P35Provider>
							<P35FrameContainer />
						</P35Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P36"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P36Provider>
							<P36FrameContainer />
						</P36Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P37"
			element={
				<CrudProvider>
					<P37Provider>
						<P37FrameContainer />
					</P37Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P37X"
			element={
				<CrudProvider>
					<P37XProvider>
						<P37XFrameContainer />
					</P37XProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P38"
			element={
				<CrudProvider>
					<P38Provider>
						<P38FrameContainer />
					</P38Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P41"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P41Provider>
							<P41FrameContainer />
						</P41Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P42"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P42Provider>
							<P42FrameContainer />
						</P42Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P51"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P51Provider>
							<P51FrameContainer />
						</P51Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
	</>
);

export default pRoutes2;
