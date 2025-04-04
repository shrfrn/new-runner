import toc from '../exercises/toc.js'

document.addEventListener('DOMContentLoaded', init)

function init() {
    renderSidebar(toc.sidebar)
}

function renderSidebar(items) {
    const elSidebar = document.querySelector('.sidebar-items')
    const sidebarHtml = buildSideBar(items)
    elSidebar.innerHTML = sidebarHtml
}

function buildSideBar(items) {
    let strHtml = ''

    items.forEach(entry => {
        if (entry.items) {
            const res = buildSideBar(entry.items)
            strHtml += `
                <details>
                    <summary>${entry.label}</summary>
                    <nav>${res}</nav>
                </details>`
        } else {
            strHtml += `
                <a class="sidebar-item" onclick="onLoadItem(event, '${entry.ex}')" href="">${entry.label}</a>`
            return strHtml
        }
    })
    return strHtml
}

function onLoadItem(ev, exFileName) {
    ev.preventDefault()
    console.log(exFileName)
}