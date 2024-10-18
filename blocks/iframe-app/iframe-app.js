import { getPathDetails } from '../../scripts/scripts.js';
import { defaultProfileClient, isSignedInUser } from '../../scripts/auth/profile.js';

const authEventType = 'REQUEST_AUTH_STATE';

const { lang } = getPathDetails();

/**
 * This function gets the IMS info.
 * @returns {Promise<IMSInfo>}
 */
async function getIMSInfo() {
  const isAuthenticated = await isSignedInUser();
  let imsToken;
  let imsProfile;
  if (isAuthenticated) {
    imsToken = await defaultProfileClient.getIMSAccessToken();
    imsProfile = await defaultProfileClient.getIMSProfile();
  }
  return {
    isAuthenticated,
    imsToken,
    imsProfile,
    locale: lang,
  };
}

/**
 * This function listens to messages from iframe.
 * If the message type is 'REQUEST_AUTH_STATE', it sends the IMS info to the iframe if user is logged in.
 * @param {HTMLIFrameElement} iframe
 */
function listenToMessages(iframe) {
  window.addEventListener('message', (event) => {
    if (event.origin === new URL(iframe.src).origin && event.data.type === authEventType) {
      getIMSInfo().then((payload) => {
        event.source.postMessage(
          {
            type: 'AUTH_STATE_RESPONSE',
            requestId: event.data?.requestId,
            payload,
          },
          event.origin,
        );
      });
    }
  });
}

export default function decorate(block) {
  const link = block.querySelector('a');
  const appUrl = link ? link.getAttribute('href') : block.textContent.trim();
  const iframe = document.createElement('iframe');
  iframe.src = "https://publish-p139364-e1423304.adobeaemcloud.com/content/celestyal-asset-share/us/en/light.html";
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.style.border = 'none';
  block.textContent = '';
  block.append(iframe);
}
