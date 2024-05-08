import { Route } from "react-router-dom";
import { CrudProvider } from "../contexts/crud/CrudProvider";
import { A01Provider } from "../contexts/A01/A01Provider";
import { A011Provider } from "@/contexts/A011/A011Provider";
import { A012Provider } from "@/contexts/A012/A012Provider";
import { A013Provider } from "@/contexts/A013/A013Provider";
import { A014Provider } from "@/contexts/A014/A014Provider";
import { A015Provider } from "@/contexts/A015/A015Provider";
import { A02Provider } from "@/contexts/A02/A02Provider";
import { A03Provider } from "@/contexts/A03/A03Provider";
import { A04Provider } from "@/contexts/A04/A04Provider";
import { A05Provider } from "@/contexts/A05/A05Provider";
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
import { A16Provider } from "@/contexts/A16/A16Provider";
import { A20Provider } from "@/contexts/A20/A20Provider";
import { A26Provider } from "@/contexts/A26/A26Provider";
import { AA01Provider } from "@/contexts/AA01/AA01Provider";
import { A010Provider } from "@/contexts/a010/A010Provider";
import { A01FrameContainer } from "@/pages/A01/A01FrameContainer";
import { A011FrameContainer } from "@/pages/A011/A011FrameContainer";
import { A012FrameContainer } from "@/pages/A012/A012FrameContainer";
import { A013FrameContainer } from "@/pages/A013/A013FrameContainer";
import { A014FrameContainer } from "@/pages/A014/A014FrameContainer";
import { A015FrameContainer } from "@/pages/A015/A015FrameContainer";
import { A02FrameContainer } from "@/pages/A02/A02FrameContainer";
import { A03FrameContainer } from "@/pages/A03/A03FrameContainer";
import { A04FrameContainer } from "@/pages/A04/A04FrameContainer";
import { A05FrameContainer } from "@/pages/A05/A05FrameContainer";
import { A06FrameContainer } from "@/pages/A06/A06FrameContainer";
import { A08FrameContainer } from "@/pages/A08/A08FrameContainer";
import { A09FrameContainer } from "@/pages/A09/A09FrameContainer";
import { A10FrameContainer } from "@/pages/A10/A10FrameContainer";
import { A11FrameContainer } from "@/pages/A11/A11FrameContainer";
import { A12FrameContainer } from "@/pages/A12/A12FrameContainer";
import { A13FrameContainer } from "@/pages/A13/A13FrameContainer";
import { A14FrameContainer } from "@/pages/A14/A14FrameContainer";
import { A15FrameContainer } from "@/pages/A15/A15FrameContainer";
import { A16FrameContainer } from "@/pages/A16/A16FrameContainer";
import { A20FrameContainer } from "@/pages/A20/A20FrameContainer";
import { A26FrameContainer } from "@/pages/A26/A26FrameContainer";
import { A17Provider } from "@/contexts/A17/A17Provider";
import { A17FrameContainer } from "@/pages/A17/A17FrameContainer";
import { A18Provider } from "@/contexts/A18/A18Provider";
import { A21Provider } from "@/contexts/A21/A21Provider";
import { A18FrameContainer } from "@/pages/A18/A18FrameContainer";
import { A19Provider } from "@/contexts/A19/A19Provider";
import { A19FrameContainer } from "@/pages/A19/A19FrameContainer";
import { A21FrameContainer } from "@/pages/A21/A21FrameContainer";
import { A22Provider } from "@/contexts/A22/A22Provider";
import { A22FrameContainer } from "@/pages/A22/A22FrameContainer";
import { Fragment } from "react";

const ARoutes = (props) => {
	const { ...rest } = props;
	return (
		<Fragment>
			<Route
				path="A01"
				element={
					<CrudProvider>
						<A01Provider>
							<A01FrameContainer />
						</A01Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A010"
				element={
					<CrudProvider>
						<A010Provider>
							<A01FrameContainer />
						</A010Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="AA01"
				element={
					<CrudProvider>
						<AA01Provider>
							<A01FrameContainer />
						</AA01Provider>
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
						<A02Provider>
							<A02FrameContainer />
						</A02Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A03"
				element={
					<CrudProvider>
						<A03Provider>
							<A03FrameContainer />
						</A03Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A04"
				element={
					<CrudProvider>
						<A04Provider>
							<A04FrameContainer />
						</A04Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A05"
				element={
					<CrudProvider>
						<A05Provider>
							<A05FrameContainer />
						</A05Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A06"
				element={
					<CrudProvider>
						<A06Provider>
							<A06FrameContainer />
						</A06Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A07"
				element={
					<CrudProvider>
						<A07Provider>
							<A06FrameContainer />
						</A07Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A08"
				element={
					<CrudProvider>
						<A08Provider>
							<A08FrameContainer />
						</A08Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A09"
				element={
					<CrudProvider>
						<A09Provider>
							<A09FrameContainer />
						</A09Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A10"
				element={
					<CrudProvider>
						<A10Provider>
							<A10FrameContainer />
						</A10Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A11"
				element={
					<CrudProvider>
						<A11Provider>
							<A11FrameContainer />
						</A11Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A12"
				element={
					<CrudProvider>
						<A12Provider>
							<A12FrameContainer />
						</A12Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A13"
				element={
					<CrudProvider>
						<A13Provider>
							<A13FrameContainer />
						</A13Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A14"
				element={
					<CrudProvider>
						<A14Provider>
							<A14FrameContainer />
						</A14Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A15"
				element={
					<CrudProvider>
						<A15Provider>
							<A15FrameContainer />
						</A15Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A16"
				element={
					<CrudProvider>
						<A16Provider>
							<A16FrameContainer />
						</A16Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A17"
				element={
					<CrudProvider>
						<A17Provider>
							<A17FrameContainer />
						</A17Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A18"
				element={
					<CrudProvider>
						<A18Provider>
							<A18FrameContainer />
						</A18Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A19"
				element={
					<CrudProvider>
						<A19Provider>
							<A19FrameContainer />
						</A19Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A20"
				element={
					<CrudProvider>
						<A20Provider>
							<A20FrameContainer />
						</A20Provider>
					</CrudProvider>
				}
			/>
			<Route
				path="A21"
				element={
					<CrudProvider>
						<A21Provider>
							<A21FrameContainer />
						</A21Provider>
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
						<A26Provider>
							<A26FrameContainer />
						</A26Provider>
					</CrudProvider>
				}
			/>
		</Fragment>
	);
};

ARoutes.propTypes = {};

ARoutes.displayName = "ARoutes";
export default ARoutes;
