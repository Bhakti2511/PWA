if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
    console.log("Here is DefferedPrompt.");

    installBtn.style.display = 'block';
    console.log("'beforeinstallprompt' event caught and stashed cleanly.");
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
        console.log("Installation token missing or application already installed.");
        return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User installation choice response outcome: ${outcome}`);

    deferredPrompt = null;

    installBtn.style.display = 'none';
});

window.addEventListener('appinstalled', (textEvent) => {
    console.log('Application was successfully added to the system desktop launcher workspace!', textEvent);
});