import { getPathDetails } from '../../scripts/scripts.js';



export default function decorate(block) {
  const link = block.querySelector('a');
  const appUrl = link ? link.getAttribute('href') : block.textContent.trim();
  const iframe = document.createElement('iframe');
  iframe.src = "https://publish-p139364-e1423304.adobeaemcloud.com/content/celestyal-asset-share/us/en/light.html";
  iframe.width = '100%';
  iframe.height = '500px';
  iframe.style.border = 'none';
  block.textContent = '';
  block.append(iframe);
}
