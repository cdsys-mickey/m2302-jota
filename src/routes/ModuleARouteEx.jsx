import React from "react";
import { Route } from "react-router-dom";
import { A01Provider } from "@/contexts/A01/A01Provider";
import { A02Provider } from "@/contexts/A02/A02Provider";
import { A03Provider } from "@/contexts/A03/A03Provider";
import { A04Provider } from "@/contexts/A04/A04Provider";
import { A08Provider } from "@/contexts/A08/A08Provider";
import { A09Provider } from "@/contexts/A09/A09Provider";
import { A10Provider } from "@/contexts/A10/A10Provider";
import { A11Provider } from "@/contexts/A11/A11Provider";
import { A12Provider } from "@/contexts/A12/A12Provider";
import { A13Provider } from "@/contexts/A13/A13Provider";
import { A14Provider } from "@/contexts/A14/A14Provider";
import { A16Provider } from "@/contexts/A16/A16Provider";
import { A26Provider } from "@/contexts/A26/A26Provider";
import { AA01Provider } from "@/contexts/AA01/AA01Provider";
import { A010Provider } from "@/contexts/a010/A010Provider";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { A01FrameContainer } from "@/pages/A01/A01FrameContainer";
import { A02FrameContainer } from "@/pages/A02/A02FrameContainer";
import { A03FrameContainer } from "@/pages/A03/A03FrameContainer";
import { A04FrameContainer } from "@/pages/A04/A04FrameContainer";
import { A08FrameContainer } from "@/pages/A08/A08FrameContainer";
import { A09FrameContainer } from "@/pages/A09/A09FrameContainer";
import { A10FrameContainer } from "@/pages/A10/A10FrameContainer";
import { A11FrameContainer } from "@/pages/A11/A11FrameContainer";
import { A12FrameContainer } from "@/pages/A12/A12FrameContainer";
import { A13FrameContainer } from "@/pages/A13/A13FrameContainer";
import { A14FrameContainer } from "@/pages/A14/A14FrameContainer";
import { A16FrameContainer } from "@/pages/A16/A16FrameContainer";
import { A26FrameContainer } from "@/pages/A26/A26FrameContainer";
import { A15Provider } from "@/contexts/A15/A15Provider";
import { A15FrameContainer } from "@/pages/A15/A15FrameContainer";

const ModuleARoute = () => {
	return (
		<>
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
				path="A02"
				element={
					<A02Provider>
						<A02FrameContainer />
					</A02Provider>
				}
			/>
			<Route
				path="A03"
				element={
					<A03Provider>
						<A03FrameContainer />
					</A03Provider>
				}
			/>
			<Route
				path="A04"
				element={
					<A04Provider>
						<A04FrameContainer />
					</A04Provider>
				}
			/>
			<Route
				path="A08"
				element={
					<A08Provider>
						<A08FrameContainer />
					</A08Provider>
				}
			/>
			<Route
				path="A09"
				element={
					<A09Provider>
						<A09FrameContainer />
					</A09Provider>
				}
			/>
			<Route
				path="A10"
				element={
					<A10Provider>
						<A10FrameContainer />
					</A10Provider>
				}
			/>
			<Route
				path="A11"
				element={
					<A11Provider>
						<A11FrameContainer />
					</A11Provider>
				}
			/>
			<Route
				path="A12"
				element={
					<A12Provider>
						<A12FrameContainer />
					</A12Provider>
				}
			/>
			<Route
				path="A13"
				element={
					<A13Provider>
						<A13FrameContainer />
					</A13Provider>
				}
			/>
			<Route
				path="A14"
				element={
					<A14Provider>
						<A14FrameContainer />
					</A14Provider>
				}
			/>
			<Route
				path="A15"
				element={
					<A15Provider>
						<A15FrameContainer />
					</A15Provider>
				}
			/>
			<Route
				path="A16"
				element={
					<A16Provider>
						<A16FrameContainer />
					</A16Provider>
				}
			/>
			<Route
				path="A26"
				element={
					<A26Provider>
						<A26FrameContainer />
					</A26Provider>
				}
			/>
		</>
	);
};
export default ModuleARoute;
ModuleARoute.displayName = "ModuleARoute";
