import { getRecoil, setRecoil } from '../../../utils/RecoilPortal';
import { notificationState, NotiMap } from '../state/notifications.state';
import lodashDeepClone from 'lodash/cloneDeep';

// This is a pure function that takes no assumptions of the current context,
// meaning we can store it in Recoil without an issue.
export default function notiActiveExitHandler(_: HTMLElement, key: string | number) {
  const notisMap = getRecoil(notificationState);
  const tgtNoti = notisMap[key];
  const cloneNoti = { ...tgtNoti };

  if (!tgtNoti) {
    console.warn(`Uh oh, notification with key "${key}" was not found in Recoil Map.`);
  }

  cloneNoti.isActive = false;

  // this might not be necessary outside of ctx tree
  // but lets do it to be safe
  const clonedNotiMap: NotiMap = lodashDeepClone(notisMap);

  // set cloned map to our new cloned tgt
  clonedNotiMap[key] = cloneNoti;

  setRecoil(notificationState, clonedNotiMap);
}
