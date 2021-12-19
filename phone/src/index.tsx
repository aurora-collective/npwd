import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './main.css';
import { PhoneProviders } from './PhoneProviders';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Theme as MaterialUITheme } from '@mui/material';
import attachWindowDebug from './os/debug/AttachWindowDebug';
import RecoilPortal from './utils/RecoilPortal';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MaterialUITheme {}
}

// window.mockNuiEvent is restricted to development env only
if (process.env.NODE_ENV === 'development') {
  attachWindowDebug();
}

ReactDOM.render(
  <HashRouter>
    <RecoilRoot>
      <RecoilPortal />
      <PhoneProviders />
    </RecoilRoot>
  </HashRouter>,
  document.getElementById('root'),
);
