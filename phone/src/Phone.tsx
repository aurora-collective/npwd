import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './Phone.css';
import './i18n';
import { Route } from 'react-router-dom';
import { CallModal } from '@os/call/components/CallModal';
import { HomeApp } from './apps/home/components/Home';
import { NotificationBar } from '@os/notifications/components/NotificationBar';
import { Navigation } from '@os/navigation-bar/components/Navigation';
import { useSimcardService } from '@os/simcard/hooks/useSimcardService';
import { usePhoneService } from '@os/phone/hooks/usePhoneService';
import { useApps } from '@os/apps/hooks/useApps';
import { useTwitterService } from './apps/twitter/hooks/useTwitterService';
import { useMarketplaceService } from './apps/marketplace/hooks/useMarketplaceService';
import { useBankService } from './apps/bank/hooks/useBankService';
import { useMessagesService } from './apps/messages/hooks/useMessageService';
import { isSettingsSchemaValid, useSettings } from './apps/settings/hooks/useSettings';
import { useCallService } from '@os/call/hooks/useCallService';
import { useDialService } from './apps/dialer/hooks/useDialService';
import InjectDebugData from './os/debug/InjectDebugData';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { PhoneSnackbar } from '@os/snackbar/components/PhoneSnackbar';
import { useCallModal } from './os/call/hooks/useCallModal';
import WindowSnackbar from './ui/components/WindowSnackbar';
import { useTranslation } from 'react-i18next';
import { PhoneEvents } from '@typings/phone';
import { useKeyboardService } from '@os/keyboard/hooks/useKeyboardService';
import PhoneWrapper from './PhoneWrapper';

import dayjs from 'dayjs';
import DefaultConfig from '../../config.json';
import { TopLevelErrorComponent } from '@ui/components/TopLevelErrorComponent';
import { useConfig } from '@os/phone/hooks/useConfig';
import { useContactsListener } from './apps/contacts/hooks/useContactsListener';
import { useNoteListener } from './apps/notes/hooks/useNoteListener';
import { useNotificationListener } from './os/new-notifications/hooks/useNotificationListener';

interface PhoneProps {
  notiRefCB: Dispatch<SetStateAction<HTMLElement>>;
}

export const Phone: React.FC<PhoneProps> = ({ notiRefCB }) => {
  const { t, i18n } = useTranslation();

  const { apps } = useApps();

  const [settings] = useSettings();

  const { addAlert } = useSnackbar();

  // Set language from local storage
  // This will only trigger on first mount & settings changes
  useEffect(() => {
    i18n.changeLanguage(settings.language.value).catch((e) => console.error(e));
  }, [i18n, settings.language]);

  useEffect(() => {
    if (!isSettingsSchemaValid()) {
      addAlert({
        message: t('SETTINGS.MESSAGES.INVALID_SETTINGS'),
        type: 'error',
      });
    }
    // We only want to run this on first mount of the phone,
    // so we leave an empty dep array. Otherwise, we hit a max depth error.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useConfig();

  useKeyboardService();
  usePhoneService();
  useSimcardService();
  useTwitterService();
  useMarketplaceService();
  useBankService();
  useMessagesService();
  useContactsListener();
  useNoteListener();
  useNotificationListener();
  /*usePhotoService();*/
  useCallService();
  useDialService();

  const { modal: callModal } = useCallModal();

  return (
    <div>
      <TopLevelErrorComponent>
        <WindowSnackbar />
        <PhoneWrapper>
          <NotificationBar />
          <div className="PhoneAppContainer" ref={notiRefCB}>
            <>
              <Route exact path="/" component={HomeApp} />
              {callModal && <Route exact path="/call" component={CallModal} />}
              {apps.map((App) => (
                <App.Route key={App.id} />
              ))}
            </>
            <PhoneSnackbar />
          </div>
          <Navigation />
        </PhoneWrapper>
      </TopLevelErrorComponent>
    </div>
  );
};

export default Phone;

InjectDebugData<any>([
  {
    app: 'PHONE',
    method: PhoneEvents.SET_VISIBILITY,
    data: true,
  },
  {
    app: 'PHONE',
    method: PhoneEvents.SET_PHONE_READY,
    data: true,
  },
  {
    app: 'PHONE',
    method: PhoneEvents.SET_TIME,
    data: dayjs().format('hh:mm'),
  },
  {
    app: 'PHONE',
    method: PhoneEvents.SET_CONFIG,
    data: DefaultConfig,
  },
]);
