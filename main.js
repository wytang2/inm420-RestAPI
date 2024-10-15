async function getAPOD(apiKey, date = '') {
    try {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Display the title, image/video, and description
        const content = document.querySelector("#apod-info");
        
        let mediaContent = '';
        
        // Check if the media is an image or video
        if (data.media_type === 'image') {
            mediaContent = `<img src="${data.url}" alt="${data.title}" style="max-width: 50%;">`;
        } else if (data.media_type === 'video') {
            mediaContent = `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width: 100%; height: 400px;"></iframe>`;
        }

        // Display the content in the HTML
        content.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            ${mediaContent}
            <p>${data.explanation}</p>
            ${data.copyright ? `<p><strong>Copyright:</strong> ${data.copyright}</p>` : ''}
        `;
    } catch (error) {
        console.warn(`Error: ${error}`);
        document.querySelector("#apod-info").innerHTML = `<p>Sorry, we don't have access to the data.</p>`;
    }
}

// Function to handle date selection and display past APOD
document.querySelector("#apod-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const date = document.querySelector("#date-input").value;
    const apiKey = 'dLfZJOX2048hePgwUC6F0CK1Y8igdRIdx5hzCyPy'; 
    getAPOD(apiKey, date);
});

// Fetch today's APOD on page load
window.onload = function() {
    const apiKey = 'dLfZJOX2048hePgwUC6F0CK1Y8igdRIdx5hzCyPy'; 
    getAPOD(apiKey);
}
