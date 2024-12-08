import { Client } from "@notionhq/client";

interface Row {
  properties: {
    id: { id: string; type: string; number: number };
    quote: {
      title: {
        plain_text: string;
      }[];
    };
    credit: {
      rich_text: {
        plain_text: string;
      }[];
    };
  };
}

interface ThinkingRow {
  id: string;
  properties: {
    Tag: {
      id: string;
      type: string;
      multi_select: {
        options: {
          id: string;
          name: string;
        }[];
      };
    };
    Created_at: {
      date: {
        start: string;
      };
    };
    Title: {
      title: {
        type: string;
        text: {
          content: string;
        };
      }[];
    };
    id: {
      id: string;
      type: string;
      number: number;
    };
  };
}

class Notion {
  private readonly client: Client;
  constructor() {
    this.client = new Client({ auth: process.env.NOTION_KEY });
  }

  async getQuoteAll() {
    const page = await this.client.databases.query({
      database_id: process.env.NOTION_QUOTE_DATABASE_ID as string,
      sorts: [{ property: "id", direction: "ascending" }],
    });
    return page.results.map((row: unknown) => {
      const rowData = row as Row;
      return {
        id: rowData.properties.id.number,
        quote: rowData.properties.quote.title[0].plain_text,
        credit: rowData.properties.credit.rich_text[0].plain_text,
      };
    });
  }

  async getThinkingAll() {
    const page = await this.client.databases.query({
      database_id: "15549d40e26d8029a1b6e0e4fcd1d15c",
      sorts: [{ property: "Created_at", direction: "descending" }],
    });

    return page.results.map((row: unknown) => {
      const rowData = row as ThinkingRow;
      return {
        seq: rowData.properties.id.number,
        title: rowData.properties.Title.title[0].text.content,
        created_at: rowData.properties.Created_at.date.start,
        url: rowData.id,
      };
    });
  }

  get getClient() {
    return this.client;
  }
}

export const notion = new Notion();
