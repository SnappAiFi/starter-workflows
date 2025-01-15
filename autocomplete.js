document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('autocomplete-input');
    const suggestionsList = document.getElementById('suggestions');

    input.addEventListener('input', function() {
        const query = input.value;

        fetch(`/autocomplete?query=${query}`)
            .then(response => response.json())
            .then(suggestions => {
                suggestionsList.innerHTML = '';
                suggestions.forEach(suggestion => {
                    const li = document.createElement('li');
                    li.textContent = suggestion;
                    suggestionsList.appendChild(li);
                });
            });
    });
});
