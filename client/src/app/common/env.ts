export const ENV = {
  development: {
    notion_api: process.env.NOTION_API_SECRET,
    notion_database: process.env.NOTION_DATABASE_ADDRESS,
  },
  public: {
    supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAPIKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
  }
}