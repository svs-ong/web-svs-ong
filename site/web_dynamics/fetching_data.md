# Javascript fetch

HTML File (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fetch Articles</title>
    <script>
        // Define an asynchronous function to fetch articles
        async function fetchArticles() {
            try {
                console.log("Fetching articles from the server...");
                const response = await fetch('http://localhost:3000/articles');
                console.log("Received response from server", response);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const articles = await response.json();
                console.log("Parsed JSON data:", articles);

                const list = document.getElementById('articles-list');
                articles.forEach(article => {
                    const item = document.createElement('li');
                    item.textContent = `${article.title}: ${article.content}`;
                    list.appendChild(item);
                });

                console.log("Articles have been displayed on the page.");
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    </script>
</head>
<body>
    <h1>Articles</h1>
    <ul id="articles-list"></ul>

    <!-- Trigger fetch operation when the window loads -->
    <script>
        window.onload = fetchArticles;
    </script>
</body>
</html>
```

#### Breakdown of the Async/Await Usage: 
 
1. **Async Function Declaration:** 
The function `fetchArticles` is declared as `async`, which allows you to use `await` within it. This function is triggered when the window loads.
 
2. **Await Fetch:** 
The `fetch` call is prefixed with `await`, pausing the function execution until the Promise returned by `fetch` resolves. This eliminates the need for a `.then()` method to handle the Promise.
 
3. **Check Response Status:** 
The script checks `response.ok` to determine if the HTTP status code is in the successful range. If not, it throws an error, which is caught by the `catch` block.
 
4. **Await JSON Parsing:** 
Another `await` is used to pause execution until the JSON parsing is complete, simplifying error handling and making the code cleaner.
 
5. **Error Handling:** 
The `try...catch` block handles any errors that occur during the fetch or JSON parsing process, logging them to the console.

Using async/await in this manner improves readability and error handling in your JavaScript code, making asynchronous operations straightforward and more maintainable.