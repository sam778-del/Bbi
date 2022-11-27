$(document).ready(function() {
    document.querySelector('button').addEventListener('click', () => {
        window.opener.postMessage('close', 'http://localhost:3000')
    })
})