import React, { useEffect , useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Web3Context from "./contexts/web3context";
import EnvContext from './contexts/envContext'; 
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Merch, Calendar, ApeHolder, Kanban, Line, Area, Bar, Pie, Financial, ColorMapping } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Home from './pages/Home';
import TrustedUsers from './pages/trustedusers';
// import LatestProposals from './pages/LatestProposals';
import ChatTest from './components/Chat/ChatTest';
import GetChatsTest from './components/Chat/GetChats';
import PushChat from './pages/PushChat';
import { useWeb3React } from '@web3-react/core';
import { Checkbox } from './components/Checkbox';
import Dropdown from './components/Dropdown';
import ConnectButton from './components/Connect';
import SendMessage from './components/Chat/SendMessage';
// import LatestProposals from './pages/LatestProposals';
import Notifications from './pages/Notifications';
import GetUser from './components/Chat/GetUser';
import CreateUser from './components/Chat/CreateUser';
import History from './components/Chat/History';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const checkForWeb3Data = ({
    library,
    active,
    account,
    chainId,
  }: Web3ReactState) => {
    return library && active && account && chainId;
  };

  interface Web3ReactState {
    chainId?: number;
    account?: string | null | undefined;
    active: boolean;
    error?: Error;
    library?: unknown;
  }
  

  const web3Data: Web3ReactState = useWeb3React();

  const [env, setEnv] = useState('staging');
  const [isCAIP, setIsCAIP] = useState(false);

  const onChangeEnv = (e: any) => {
    setEnv(e.target.value);
  };

  const onChangeCAIP = () => {
    setIsCAIP(!isCAIP);
  };


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <ConnectButton />
      
      <EnvContext.Provider value={{ env, isCAIP }}>
        {checkForWeb3Data(web3Data) ? (
          <Web3Context.Provider value={web3Data}>
            <BrowserRouter>
              <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                  <TooltipComponent
                    content="Settings"
                  >
                    <button
                      type="button"
                      onClick={() => setThemeSettings(true)}
                      style={{ background: currentColor, borderRadius: '50%' }}
                      className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <FiSettings />
                    </button>

                  </TooltipComponent>
                </div>
                {activeMenu ? (
                  <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                  </div>
                ) : (
                  <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                  </div>
                )}
                <div
                  className={
                    activeMenu
                      ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                      : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                  }
                >
                  <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                  </div>
                  <div>
                    {themeSettings && (<ThemeSettings />)}

                    <Routes>
                      {/* dashboard  */}
                      <Route path="/" element={(<Ecommerce />)} />
                      <Route path="/analyse" element={(<Ecommerce />)} />

                      {/* pages  */}
                      <Route path="/merch" element={<Merch />} />
                      <Route path="/merch" element={<Merch />} />
                      <Route path="/proposals" element={<Home />} />

                      {/* apps  */}
                      <Route path="/kanban" element={<Kanban />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/home" element={<Home />} />

                      {/* charts  */}
                      <Route path="/line" element={<Line />} />
                      <Route path="/area" element={<Area />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/financial" element={<Financial />} />
                      <Route path="/color-mapping" element={<ColorMapping />} />
                      <Route path="/apeholders" element={<ApeHolder />} />
                      <Route path="/trustlevel" element={<TrustedUsers />} />
                      <Route path="/chat" element={<ChatTest />} />
                      <Route path="/chats" element={<GetChatsTest />} />
                      <Route path="/pushchat" element={<PushChat />} />
                      <Route path="/send" element={<SendMessage /> } />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/get" element={<GetUser />} />
                      <Route path="/create" element={<CreateUser />} />
                      <Route path="/history" element={<History />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              </div>
            </BrowserRouter>
          </Web3Context.Provider>
        ) : null}
      </EnvContext.Provider>
    </div>
  );
};

export default App;