export default function render(html, parent) {
    const template = document.createElement('template');
    template.innerHTML = html;

    parent.appendChild(template.content);
    
}