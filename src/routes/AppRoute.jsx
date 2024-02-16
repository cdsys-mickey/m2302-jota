import { Route, Routes } from "react-router-dom";

import { ZZCrudProvider } from "@/contexts/crud/ZZCrudProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import { MockC04FrameContainer } from "@/mock-pages/MockC04FrameContainer";
import HomeContainer from "@/pages/home/HomeContainer";
import { DSGTest2Container } from "@/pages/lab/DSGTest2Container";
import { DSGTestContainer } from "@/pages/lab/DSGTestContainer";
import { DSGTestProvider } from "@/pages/lab/DSGTestProvider";
import { SignInContainer } from "@/pages/signin/SignInContainer";
import { SignInXContainer } from "@/pages/signin/SignInXContainer";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import InfoPage from "@/shared-pages/InfoPage";

import { A01Provider } from "@/contexts/A01/A01Provider";
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
import { CrudProvider } from "@/contexts/crud/CrudProvider";
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
import SignalRTest from "@/pages/lab/SignalRTest";
import { ZA03Provider } from "@/contexts/ZA03/ZA03Provider";
import { HomeProvider } from "@/contexts/home/HomeProvider";
import { ZA03FrameContainer } from "@/pages/ZA03/ZA03FrameContainer";
import CheckAuthRoute from "./CheckAuthRoute";
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

const AppRoute = () => {
	return (
		<Routes>
			{/* LANDING REDIRECTION */}
			<Route
				index
				element={
					// <Navigate to={import.meta.env.VITE_URL_LANDING} replace />
					<CheckAuthRoute />
				}
			/>
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
				<Route path="signalr" element={<SignalRTest />} />
			</Route>
			<Route path="lab-protected" element={<ProtectedRoute />}>
				<Route path="dsg" element={<DSGTest2Container />} />
			</Route>

			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route
					path="home"
					element={
						<HomeProvider>
							<HomeContainer />
						</HomeProvider>
					}
				/>

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

					<Route
						path="ZA03"
						element={
							<CrudProvider>
								<ZA03Provider>
									<ZA03FrameContainer />
								</ZA03Provider>
							</CrudProvider>
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
