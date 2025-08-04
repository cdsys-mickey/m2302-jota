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
import { P52FrameContainer } from "@/modules/P52/P52FrameContainer";
import { P52Provider } from "@/modules/P52/P52Provider";
import { P53FrameContainer } from "@/modules/P53/P53FrameContainer";
import { P53Provider } from "@/modules/P53/P53Provider";
import { P54FrameContainer } from "@/modules/P54/P54FrameContainer";
import { P54Provider } from "@/modules/P54/P54Provider";
import { P55FrameContainer } from "@/modules/P55/P55FrameContainer";
import { P55Provider } from "@/modules/P55/P55Provider";
import { P56FrameContainer } from "@/modules/P56/P56FrameContainer";
import { P56Provider } from "@/modules/P56/P56Provider";
import { P57FrameContainer } from "@/modules/P57/P57FrameContainer";
import { P57Provider } from "@/modules/P57/P57Provider";
import { P58FrameContainer } from "@/modules/P58/P58FrameContainer";
import { P58Provider } from "@/modules/P58/P58Provider";
import { P61FrameContainer } from "@/modules/P61/P61FrameContainer";
import { P61Provider } from "@/modules/P61/P61Provider";
import { P62FrameContainer } from "@/modules/P62/P62FrameContainer";
import { P62Provider } from "@/modules/P62/P62Provider";
import { P63FrameContainer } from "@/modules/P63/P63FrameContainer";
import { P63Provider } from "@/modules/P63/P63Provider";
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
		<Route
			path="P52"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P52Provider>
							<P52FrameContainer />
						</P52Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P53"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<P53Provider>
							<P53FrameContainer />
						</P53Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="P54"
			element={
				<CrudProvider>
					<P54Provider>
						<P54FrameContainer />
					</P54Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P55"
			element={
				<CrudProvider>
					<P55Provider>
						<P55FrameContainer />
					</P55Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P56"
			element={
				<CrudProvider>
					<P56Provider>
						<P56FrameContainer />
					</P56Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P57"
			element={
				<CrudProvider>
					<P57Provider>
						<P57FrameContainer />
					</P57Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P58"
			element={
				<CrudProvider>
					<P58Provider>
						<P58FrameContainer />
					</P58Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P61"
			element={
				<CrudProvider>
					<P61Provider>
						<P61FrameContainer />
					</P61Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P62"
			element={
				<CrudProvider>
					<P62Provider>
						<P62FrameContainer />
					</P62Provider>
				</CrudProvider>
			}
		/>
		<Route
			path="P63"
			element={
				<CrudProvider>
					<P63Provider>
						<P63FrameContainer />
					</P63Provider>
				</CrudProvider>
			}
		/>
	</>
);

export default pRoutes2;
