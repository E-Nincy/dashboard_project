// src/d.js
// micro-library helper to create elements easily
function c(tag, text = '', className = '') {
	const el = document.createElement(tag);
	if (text) el.innerText = text;
	if (className) el.classList.add(className);
	return el;
}
