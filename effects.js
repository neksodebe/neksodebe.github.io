const filter = ":not(html):not(body):not(script):not(#container)"

/* 
*:not(html):not(body):not(script):hover {
	outline: red dotted 2px;
	cursor: pointer;
}
*/

const elements = document.querySelectorAll(filter);

let oldOutline = "";

elements.forEach(element => {
  element.style.addEventListener = "outline: red dotted 2px;";

  element.addEventListener('mouseover', () => {
    const selector = getSelector(element);
    const popup = document.getElementById('popup');
    popup.innerHTML = selector;
    popup.style.display = 'block';

    const elementRect = element.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    let top = elementRect.top + window.pageYOffset - popupRect.height - 10;
    let left = elementRect.left + window.pageXOffset + elementRect.width / 2 - popupRect.width / 2;

    // Check if popup is outside of body and adjust position
    if (top < 0) {
      top = elementRect.bottom + window.pageYOffset + 10;
    }
    if (left < 0) {
      left = 0;
    } else if (left + popupRect.width > document.body.clientWidth) {
      left = document.body.clientWidth - popupRect.width;
    }

    popup.style.top = top + 'px';
    popup.style.left = left + 'px';

    oldOutline = element.style.outline;
    element.style.outline = "red dotted 2px";
  });

  element.addEventListener('mouseout', () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    element.style.outline = oldOutline;
  });
});

function getSelector(element) {
  const tag = element.tagName.toLowerCase();
  const id = element.id ? '#' + element.id : '';
  const classes = element.className ? '.' + element.className.replace(/ /g, '.') : '';
  return tag + id + classes;
}
