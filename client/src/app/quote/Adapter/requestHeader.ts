export const options = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.NOTION_API_SECRET}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  },
  next: {
    revalidate: 0
  }
}