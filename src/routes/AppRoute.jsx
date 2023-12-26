import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ZZCrudProvider } from "@/contexts/crud/ZZCrudProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import HomeContainer from "@/pages/home/HomeContainer";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import InfoPage from "@/shared-pages/InfoPage";
import { MockC04FrameContainer } from "../mock-pages/MockC04FrameContainer";
import { DSGTest2Container } from "../pages/lab/DSGTest2Container";
import { DSGTestContainer } from "../pages/lab/DSGTestContainer";
import { DSGTestProvider } from "../pages/lab/DSGTestProvider";
import { SignInContainer } from "../pages/signin/SignInContainer";
import { SignInXContainer } from "../pages/signin/SignInXContainer";
import ModuleARoute from "./ModuleARoute";

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
import { A011Provider } from "../contexts/A011/A011Provider";
import { A011FrameContainer } from "../pages/A011/A011FrameContainer";

const AppRoute = () => {
	return (
		<Routes>
			{/* Sign In */}
			<Route path="auth" element={<SignInRoute />}>
				<Route index path="signin" element={<SignInContainer />} />
				<Route path="signinx" element={<SignInXContainer />} />
			</Route>
			{/* Lab */}
			<Route path="lab">
				<Route path="loading" element={<LoadingFrame />} />
				<Route
					path="dsg"
					element={
						<DSGTestProvider>
							<DSGTestContainer />
						</DSGTestProvider>
					}
				/>
			</Route>
			<Route path="lab-protected" element={<ProtectedRoute />}>
				<Route path="dsg" element={<DSGTest2Container />} />
			</Route>
			{/* LANDING REDIRECTION */}
			<Route
				path="/"
				element={
					<Navigate to={import.meta.env.VITE_URL_LANDING} replace />
				}
			/>
			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route path="home" element={<HomeContainer />} />

				<Route path="modules">
					{/* <Route
						path="A01M"
						element={
							<ZZCrudProvider>
								<MockProdsProvider>
									<MockA01FrameContainer />
								</MockProdsProvider>
							</ZZCrudProvider>
						}
					/> */}
					{/* <Route path="A" element={<ModuleARoute />} /> */}

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

					<Route
						path="C04"
						element={
							<ZZCrudProvider>
								<PurchaseProvider>
									<MockC04FrameContainer />
								</PurchaseProvider>
							</ZZCrudProvider>
						}
					/>
					{/* MODULE NOT FOUND */}
					<Route
						path="*"
						element={
							<InfoPage
								severity="warning"
								alertProps={
									{
										// maxWidth:
									}
								}
								title="找不到您要瀏覽的頁面"
								message="請聯絡系統管理員"
							/>
						}
					/>
				</Route>
			</Route>

			{/* PUBLIC PAGE NOT FOUND */}
			<Route
				path="*"
				element={
					<InfoPage
						severity="warning"
						alertProps={
							{
								// maxWidth:
							}
						}
						title="找不到您要瀏覽的頁面"
						message="請聯絡系統管理員"
					/>
				}
			/>
		</Routes>
	);
};

export default AppRoute;
