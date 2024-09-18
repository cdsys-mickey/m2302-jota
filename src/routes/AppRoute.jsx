import { Route, Routes } from "react-router-dom";

import HomeContainer from "@/pages/home/HomeContainer";
import { DSGTest2Container } from "@/pages/lab/dsg/DSGTest2Container";
import { DSGTestContainer } from "@/pages/lab/dsg/DSGTestContainer";
import { DSGTestProvider } from "@/pages/lab/dsg/DSGTestProvider";
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
import { A17Provider } from "@/contexts/A17/A17Provider";
import { A18Provider } from "@/contexts/A18/A18Provider";
import { A19Provider } from "@/contexts/A19/A19Provider";
import { A20Provider } from "@/contexts/A20/A20Provider";
import { A21Provider } from "@/contexts/A21/A21Provider";
import { A22Provider } from "@/contexts/A22/A22Provider";
import { A26Provider } from "@/contexts/A26/A26Provider";
import { AA01Provider } from "@/contexts/AA01/AA01Provider";
import { B05Provider } from "@/contexts/B05/B05Provider";
import { B06Provider } from "@/contexts/B06/B06Provider";
import { C01Provider } from "@/contexts/C01/C01Provider";
import { C02Provider } from "@/contexts/C02/C02Provider";
import { C03Provider } from "@/contexts/C03/C03Provider";
import { C04Provider } from "@/contexts/C04/C04Provider";
import { C05Provider } from "@/contexts/C05/C05Provider";
import { C06Provider } from "@/contexts/C06/C06Provider";
import { C07Provider } from "@/contexts/C07/C07Provider";
import { ZA03Provider } from "@/contexts/ZA03/ZA03Provider";
import { A010Provider } from "@/contexts/a010/A010Provider";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { HomeProvider } from "@/contexts/home/HomeProvider";
import { SettingsProvider } from "@/contexts/settings/SettingsProvider";
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
import { A17FrameContainer } from "@/pages/A17/A17FrameContainer";
import { A18FrameContainer } from "@/pages/A18/A18FrameContainer";
import { A19FrameContainer } from "@/pages/A19/A19FrameContainer";
import { A20FrameContainer } from "@/pages/A20/A20FrameContainer";
import { A21FrameContainer } from "@/pages/A21/A21FrameContainer";
import { A22FrameContainer } from "@/pages/A22/A22FrameContainer";
import { A26FrameContainer } from "@/pages/A26/A26FrameContainer";
import { B05FrameContainer } from "@/pages/B05/B05FrameContainer";
import { B06FrameContainer } from "@/pages/B06/B06FrameContainer";
import { C01FrameContainer } from "@/pages/C01/C01FrameContainer";
import { C02FrameContainer } from "@/pages/C02/C02FrameContainer";
import { C03FrameContainer } from "@/pages/C03/C03FrameContainer";
import { C04FrameContainer } from "@/pages/C04/C04FrameContainer";
import { C05FrameContainer } from "@/pages/C05/C05FrameContainer";
import { C06FrameContainer } from "@/pages/C06/C06FrameContainer";
import { C07FrameContainer } from "@/pages/C07/C07FrameContainer";
import { ZA03FrameContainer } from "@/pages/ZA03/ZA03FrameContainer";
import { RenewFrameContainer } from "@/pages/auth/RenewFrameContainer";
import SignalRTest from "@/pages/lab/SignalRTest";
import DSGTest3 from "@/pages/lab/dsg/DSGTest3";
import { MessagesFrameContainer } from "@/pages/messages/MessagesFrameContainer";
import { SettingsFrameContainer } from "@/pages/settings/SettingsFrameContainer";
import { C08Provider } from "../contexts/C08/C08Provider";
import { C09Provider } from "../contexts/C09/C09Provider";
import { D01Provider } from "../contexts/D01/D01Provider";
import { D02Provider } from "../contexts/D02/D02Provider";
import { D041Provider } from "../contexts/D041/D041Provider";
import { D05Provider } from "../contexts/D05/D05Provider";
import { D06Provider } from "../contexts/D06/D06Provider";
import { D07Provider } from "../contexts/D07/D07Provider";
import { InfiniteLoaderProvider } from "../contexts/infinite-loader/InfiniteLoaderProvider";
import { C08FrameContainer } from "../pages/C08/C08FrameContainer";
import { C09FrameContainer } from "../pages/C09/C09FrameContainer";
import { D01FrameContainer } from "../pages/D01/D01FrameContainer";
import { D02FrameContainer } from "../pages/D02/D02FrameContainer";
import { D041FrameContainer } from "../pages/D04/D041FrameContainer";
import { D05FrameContainer } from "../pages/D05/D05FrameContainer";
import { D06FrameContainer } from "../pages/D06/D06FrameContainer";
import { D07FrameContainer } from "../pages/D07/D07FrameContainer";
import DialogsTest from "../pages/lab/DialogsTest";
import { KitchenSinkContainer } from "../pages/lab/KitchenSinkContainer";
import { DialogsProvider } from "../shared-contexts/dialog/DialogsProvider";
import CheckAuthRoute from "./CheckAuthRoute";
import { MessagesProvider } from "@/contexts/msgs/MesssagesProvider";
import { B011Provider } from "@/contexts/B011/B011Provider";
import { B011FrameContainer } from "@/pages/B011/B011FrameContainer";
import { B02Provider } from "@/contexts/B02/B02Provider";
import { B02FrameContainer } from "@/pages/B02/B02FrameContainer";
import { B04Provider } from "@/contexts/B04/B04Provider";
import { B04FrameContainer } from "@/pages/B04/B04FrameContainer";

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
				{/* <Route path="lock-switch" element={<LockSwitchTest />} /> */}
				<Route
					path="dsg"
					element={
						<DSGTestProvider>
							<DSGTestContainer />
						</DSGTestProvider>
					}
				/>
				<Route path="dsg3" element={<DSGTest3 />} />
				<Route path="signalr" element={<SignalRTest />} />
				<Route
					path="dialogs"
					element={
						<DialogsProvider>
							<DialogsTest />
						</DialogsProvider>
					}
				/>
			</Route>
			<Route path="lab-protected" element={<ProtectedRoute />}>
				<Route path="kitchen-sink" element={<KitchenSinkContainer />} />
				<Route path="dsg" element={<DSGTest2Container />} />
				{/* <Route path="option-picker" element={<OptionPickerTest />} /> */}
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
				<Route
					path="msgs"
					element={
						<InfiniteLoaderProvider>
							<MessagesProvider>
								<MessagesFrameContainer />
							</MessagesProvider>
						</InfiniteLoaderProvider>
					}
				/>
				<Route path="renew" element={<RenewFrameContainer />} />
				<Route
					path="settings"
					element={
						<SettingsProvider>
							<SettingsFrameContainer />
						</SettingsProvider>
					}
				/>

				<Route path="modules">
					{/* A */}
					<Route
						path="A01"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<A01Provider>
										<A01FrameContainer />
									</A01Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
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

					{/* B */}
					<Route
						path="B011"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<B011Provider>
										<B011FrameContainer />
									</B011Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="B02"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<B02Provider>
										<B02FrameContainer />
									</B02Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="B04"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<B04Provider>
										<B04FrameContainer />
									</B04Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="B05"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<B05Provider>
										<B05FrameContainer />
									</B05Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="B06"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<B06Provider>
										<B06FrameContainer />
									</B06Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					{/* C */}
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
					{/* D */}
					<Route
						path="D01"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D01Provider>
										<D01FrameContainer />
									</D01Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="D02"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D02Provider>
										<D02FrameContainer />
									</D02Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="D041"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D041Provider>
										<D041FrameContainer />
									</D041Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="D05"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D05Provider>
										<D05FrameContainer />
									</D05Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="D06"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D06Provider>
										<D06FrameContainer />
									</D06Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					<Route
						path="D07"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<D07Provider>
										<D07FrameContainer />
									</D07Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
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
