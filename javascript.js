document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const wordInput = document.getElementById("wordInput");
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    searchBtn.addEventListener("click", () => {
        searchWord();
    });

    wordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchWord();
        }
    });

    function searchWord() {
        let word = wordInput.value.trim();
        
        if (word === "") {
            resultDiv.innerHTML = "<p>Please enter a word.</p>";
            return;
        }

        // Show loading effect
        loadingDiv.style.display = "block";
        resultDiv.innerHTML = "";

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            .then(response => response.json())
            .then(data => {
                loadingDiv.style.display = "none";
                if (data.title) {
                    resultDiv.innerHTML = `<p>Word not found. Try another.</p>`;
                } else {
                    let definition = data[0].meanings[0].definitions[0].definition;
                    let partOfSpeech = data[0].meanings[0].partOfSpeech;
                    let example = data[0].meanings[0].definitions[0].example || "No example available.";
                    let phonetics = data[0].phonetics[0]?.text || "No pronunciation found.";
                    
                    resultDiv.innerHTML = `
                        <h2>${word}</h2>
                        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
                        <p><strong>Definition:</strong> ${definition}</p>
                        <p><strong>Example:</strong> ${example}</p>
                        <p><strong>Pronunciation:</strong> ${phonetics}</p>
                    `;
                }
            })
            .catch(error => {
                loadingDiv.style.display = "none";
                resultDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
            });
    }
});
