# Lab Work: Blog Articles with Data Fetching

## Objective:

Implement data fetching in your blog application using React hooks. Fetch articles from the server and display them in the homepage's articles section.

## Steps:

1. **Set Up the Server:**

   - Follow the setup instructions in the server's README.md file

2. **Create Custom Hook:**

   - Create a new hook `useArticles` to fetch and manage articles
   - Implement loading and error states
   - Add a refetch function for manual updates

3. **Create Article Component:**

   - Create an `ArticleCard` component to display individual articles
   - Use MUI components for styling
   - Display article title, author, date, and content preview

4. **Update Homepage:**
   - Replace static articles with dynamic data from the server
   - Add loading indicators
   - Implement error handling
   - Add a refresh button

## Requirements:

- Use React hooks for data fetching
- Handle loading and error states
- Implement proper TypeScript types
- Use MUI components for styling
- Follow React best practices

## Resources:

- [React Hooks Documentation](https://react.dev/reference/react)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
