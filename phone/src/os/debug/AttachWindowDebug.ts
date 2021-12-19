import { PhoneEvents } from '../../../../typings/phone';
import { QueueNotificationOpts } from '../new-notifications/hooks/useNotifications';

function dispatchEvent<T = any>({ method, app, data }: { method: string; app: string; data: T }) {
  setTimeout(() => {
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          app,
          method,
          data: data ?? {},
        },
      }),
    );
  }, 200);
}

const debugObj = {
  testNotification: () => {
    dispatchEvent<QueueNotificationOpts>({
      method: PhoneEvents.QUEUE_NOTIFICATION,
      app: 'PHONE',
      data: {
        appId: 'TWITTER',
        path: '/twitter',
        message: 'Taso just tweeted: You suck bro!',
        duration: 3000,
      },
    });
  },
  mockNuiEvent: dispatchEvent,
  testSnackbar: (message: string, type: IAlert) => {
    dispatchEvent({
      app: 'PHONE',
      data: {
        message,
        type,
      },
      method: PhoneEvents.ADD_SNACKBAR_ALERT,
    });
  },
  setPhoneVisible: (bool: boolean) => {
    dispatchEvent({
      method: PhoneEvents.SET_VISIBILITY,
      data: bool,
      app: 'PHONE',
    });
  },
};

const attachWindowDebug = () => {
  (window as any).npwdDebug = debugObj;
};

export default attachWindowDebug;
