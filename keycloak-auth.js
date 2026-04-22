const keycloak = new Keycloak({
    url: 'https://keycloak-wedding.fly.dev',
    realm: 'wedding',
    clientId: 'wedding-app'
});

window.weddingAuth = {
    keycloak,
    isVip: false,
    renderSchedule
};

keycloak.init({
    onLoad: 'login-required',
    pkceMethod: 'S256'
}).then(authenticated => {
    if (authenticated) {
        window.weddingAuth.isVip = keycloak.hasRealmRole('vip-guest');
        showAuthBar(keycloak.tokenParsed.preferred_username);
    }
}).catch(err => console.error('Keycloak init error', err));

function showAuthBar(username) {
    const bar = document.getElementById('auth-bar');
    if (!bar) return;
    document.getElementById('auth-username').textContent = 'Signed in as ' + username;
    bar.style.display = 'flex';
    document.getElementById('auth-logout-btn').addEventListener('click', () => {
        keycloak.logout({ redirectUri: 'https://linneaandcai.com' });
    });
}

function renderSchedule() {
    const content = document.getElementById('schedule-content');
    const tuesdayBlock = document.getElementById('tuesday-schedule');
    content.style.display = 'flex';
    tuesdayBlock.style.display = window.weddingAuth.isVip ? 'block' : 'none';
}
