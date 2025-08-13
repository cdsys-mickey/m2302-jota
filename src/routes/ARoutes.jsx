import { A010Provider } from "@/contexts/a010/A010Provider";
import { A011Provider } from "@/contexts/A011/A011Provider";
import { A012Provider } from "@/contexts/A012/A012Provider";
import { A013Provider } from "@/contexts/A013/A013Provider";
import { A014Provider } from "@/contexts/A014/A014Provider";
import { A015Provider } from "@/contexts/A015/A015Provider";
import { A02Provider } from "@/modules/A02/A02Provider";
import { A03Provider } from "@/contexts/A03/A03Provider";
import { A04Provider } from "@/contexts/A04/A04Provider";
import { A06Provider } from "@/contexts/A06/A06Provider";
import { A07Provider } from "@/contexts/A07/A07Provider";
import { A08Provider } from "@/contexts/A08/A08Provider";
import { A09Provider } from "@/contexts/A09/A09Provider";
import { A10Provider } from "@/contexts/A10/A10Provider";
import { A11Provider } from "@/contexts/A11/A11Provider";
import { A12Provider } from "@/contexts/A12/A12Provider";
import { A13Provider } from "@/contexts/A13/A13Provider";
import { A14Provider } from "@/contexts/A14/A14Provider";
import { A15Provider } from "@/contexts/A15/A15Provider";
import { A16Provider } from "@/modules/A16/A16Provider";
import { A16GProvider } from "@/contexts/A16G/A16GProvider";
import { A17Provider } from "@/contexts/A17/A17Provider";
import { A18Provider } from "@/contexts/A18/A18Provider";
import { A19Provider } from "@/contexts/A19/A19Provider";
import { A20Provider } from "@/contexts/A20/A20Provider";
import { A21Provider } from "@/contexts/A21/A21Provider";
import { A22Provider } from "@/contexts/A22/A22Provider";
import { A26Provider } from "@/contexts/A26/A26Provider";
import { AA01Provider } from "@/contexts/AA01/AA01Provider";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { P16Provider } from "@/contexts/P16/P16Provider";
import { A01FrameContainer } from "@/modules/A01/A01FrameContainer";
import A01Page from "@/modules/A01/A01Page";
import { A011FrameContainer } from "@/pages/jobs/A011/A011FrameContainer";
import { A012FrameContainer } from "@/pages/jobs/A012/A012FrameContainer";
import { A013FrameContainer } from "@/pages/jobs/A013/A013FrameContainer";
import { A014FrameContainer } from "@/pages/jobs/A014/A014FrameContainer";
import { A015FrameContainer } from "@/pages/jobs/A015/A015FrameContainer";
import { A02FrameContainer } from "@/modules/A02/A02FrameContainer";
import { A03FrameContainer } from "@/pages/jobs/A03/A03FrameContainer";
import { A04FrameContainer } from "@/pages/jobs/A04/A04FrameContainer";
import { A06FrameContainer } from "@/pages/jobs/A06/A06FrameContainer";
import { A05FrameContainer } from "@/modules/A05/A05FrameContainer";
import { A09FrameContainer } from "@/pages/jobs/A09/A09FrameContainer";
import { A10FrameContainer } from "@/pages/jobs/A10/A10FrameContainer";
import { A11FrameContainer } from "@/pages/jobs/A11/A11FrameContainer";
import { A12FrameContainer } from "@/pages/jobs/A12/A12FrameContainer";
import { A13FrameContainer } from "@/pages/jobs/A13/A13FrameContainer";
import { A14FrameContainer } from "@/pages/jobs/A14/A14FrameContainer";
import { A15FrameContainer } from "@/pages/jobs/A15/A15FrameContainer";
import { A16GFrameContainer } from "@/pages/jobs/A16G/A16GFrameContainer";
import { A17FrameContainer } from "@/pages/jobs/A17/A17FrameContainer";
import { A18FrameContainer } from "@/pages/jobs/A18/A18FrameContainer";
import { A19FrameContainer } from "@/pages/jobs/A19/A19FrameContainer";
import { A20FrameContainer } from "@/pages/jobs/A20/A20FrameContainer";
import { A21FrameContainer } from "@/pages/jobs/A21/A21FrameContainer";
import { A22FrameContainer } from "@/pages/jobs/A22/A22FrameContainer";
import { A26FrameContainer } from "@/pages/jobs/A26/A26FrameContainer";
import { P16FrameContainer } from "@/pages/jobs/P16/P16FrameContainer";
import { Route } from "react-router-dom";
import { A16FrameContainer } from "@/modules/A16/A16FrameContainer";
import { A05Provider } from "@/modules/A05/A05Provider";
import { A08FrameContainer } from "@/pages/jobs/A08/A08FrameContainer";
import { A28Provider } from "@/modules/A28/A28Provider";
import { A28FrameContainer } from "@/modules/A28/A28FrameContainer";

const aRoutes = (
	<>
		<Route
			path="A01"
			element={
				<A01Page />
			}
		/>
		<Route
			path="A010"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A010Provider>
							<A01FrameContainer />
						</A010Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

		<Route
			path="AA01"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<AA01Provider>
							<A01FrameContainer />
						</AA01Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A011"
			element={
				<A011Provider>
					<A011FrameContainer />
				</A011Provider>
			}
		/>
		<Route
			path="A012"
			element={
				<A012Provider>
					<A012FrameContainer />
				</A012Provider>
			}
		/>
		<Route
			path="A013"
			element={
				<A013Provider>
					<A013FrameContainer />
				</A013Provider>
			}
		/>
		<Route
			path="A014"
			element={
				<A014Provider>
					<A014FrameContainer />
				</A014Provider>
			}
		/>
		<Route
			path="A015"
			element={
				<A015Provider>
					<A015FrameContainer />
				</A015Provider>
			}
		/>
		<Route
			path="A02"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A02Provider>
							<A02FrameContainer />
						</A02Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A03"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A03Provider>
							<A03FrameContainer />
						</A03Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A04"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A04Provider>
							<A04FrameContainer />
						</A04Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A05"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A05Provider>
							<A05FrameContainer />
						</A05Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A06"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A06Provider>
							<A06FrameContainer />
						</A06Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A07"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A07Provider>
							<A06FrameContainer />
						</A07Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A08"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A08Provider>
							<A08FrameContainer />
						</A08Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A09"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A09Provider>
							<A09FrameContainer />
						</A09Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A10"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A10Provider>
							<A10FrameContainer />
						</A10Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A11"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A11Provider>
							<A11FrameContainer />
						</A11Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A12"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A12Provider>
							<A12FrameContainer />
						</A12Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A13"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A13Provider>
							<A13FrameContainer />
						</A13Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A14"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A14Provider>
							<A14FrameContainer />
						</A14Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A15"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A15Provider>
							<A15FrameContainer />
						</A15Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>

		<Route
			path="A16"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A16Provider>
							<A16FrameContainer />
						</A16Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A16G"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A16GProvider>
							<A16GFrameContainer />
						</A16GProvider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A17"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A17Provider>
							<A17FrameContainer />
						</A17Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A18"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A18Provider>
							<A18FrameContainer />
						</A18Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A19"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A19Provider>
							<A19FrameContainer />
						</A19Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A20"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A20Provider>
							<A20FrameContainer />
						</A20Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A21"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A21Provider>
							<A21FrameContainer />
						</A21Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A22"
			element={
				<A22Provider>
					<A22FrameContainer />
				</A22Provider>
			}
		/>
		<Route
			path="A26"
			element={
				<CrudProvider>
					<InfiniteLoaderProvider>
						<A26Provider>
							<A26FrameContainer />
						</A26Provider>
					</InfiniteLoaderProvider>
				</CrudProvider>
			}
		/>
		<Route
			path="A27"
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
		<Route
			path="A28"
			element={
				<CrudProvider>
					<A28Provider>
						<A28FrameContainer />
					</A28Provider>
				</CrudProvider>
			}
		/>
	</>
)

export default aRoutes;