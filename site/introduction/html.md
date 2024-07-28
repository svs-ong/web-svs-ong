# HTML Basics Tutorial 

## Using a Live Server with LiveWeave 

Before diving into the basics of HTML, setting up a live environment where you can see your changes in real time can enhance your learning experience. LiveWeave is an online tool that allows you to write HTML, CSS, and JavaScript and see the outcomes immediately. 

### Getting Started with LiveWeave 
 
- **Access LiveWeave:**  Open your browser and visit [LiveWeave](https://liveweave.com/) .
 
- **Write and Test Code:**  Use the panels for HTML, CSS, and JavaScript. Changes you make will be reflected in real time in the output panel.
 
- **Experiment and Learn:**  This tool provides a practical way to understand how HTML works interactively.

## Introduction to HTML 

HTML (Hypertext Markup Language) is the standard markup language used to create web pages. It provides the basic structure of sites, which is then enhanced and modified by other technologies like CSS and JavaScript.

## HTML Structure 

Every HTML document begins with a doctype declaration and contains at least two main parts: the head and the body.


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```
Here's a brief explanation of the HTML structure shown:
 
- `<!DOCTYPE html>`: Declares the document type and HTML version (HTML5).
 
- `<html lang="en">`: The root element of the page, with an attribute specifying the content is in English.
 
- `<head>`: Contains important metadata like: 
  - `<meta charset="UTF-8">`: Sets character encoding to UTF-8.
 
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures the page is mobile-responsive.
 
  - `<title>Page Title</title>`: Sets the title that appears in the browser tab.
 
- `<body>`: Includes all visible content: 
  - `<h1>This is a Heading</h1>`: A main heading.
 
  - `<p>This is a paragraph.</p>`: A text paragraph.


### Doctype Declaration 
The `<!DOCTYPE html>` declaration defines the document type and version of HTML. For HTML5, this is simplified to the declaration shown above.
### HTML Tags 

HTML tags are the building blocks of HTML pages. They define and enclose different parts of the content to make it function or appear a certain way.

## Basic HTML Tags 

### Headings 
HTML offers six levels of headings, `<h1>` to `<h6>`, where `<h1>` is the highest (or most important) level and `<h6>` is the least.

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
...
<h6>Heading 6</h6>
```

### Paragraphs 
The `<p>` tag defines a paragraph:

```html
<p>This is a paragraph.</p>
```

### Links 
The `<a>` tag defines a hyperlink, which is used to link from one page to another.

```html
<a href="https://www.example.com">This is a link</a>
```

### Images 
The `<img>` tag is used to embed an image in an HTML page.

```html
<img src="image.jpg" alt="My Image" width="500" height="600">
```

### Lists 
HTML supports ordered (`<ol>`) and unordered (`<ul>`) lists.
#### Unordered List 


```html
<ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
</ul>
```

#### Ordered List 


```html
<ol>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ol>
```

## Forms 

Forms are used for interactive control elements to submit information to a web server.


```html
<form action="/submit_form" method="post">
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname"><br>
    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname"><br><br>
    <input type="submit" value="Submit">
</form>
```

## Tables 
The `<table>` tag is used to create a table.

```html
<table>
    <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>30</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>Doe</td>
        <td>25</td>
    </tr>
</table>
```