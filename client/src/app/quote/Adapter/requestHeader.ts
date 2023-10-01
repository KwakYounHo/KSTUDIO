import { ENV } from "@/app/common/env"

export const options = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${ENV.NOTION_API_SECRET}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  },
  next: {
    revalidate: 0
  }
}