function switchLanguage(lang) {
    fetch('/switch-language', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang: lang })
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Reload the page after switching language
        } else {
            console.error('Failed to switch language');
        }
    })
    .catch(error => console.error('Error switching language:', error));
}