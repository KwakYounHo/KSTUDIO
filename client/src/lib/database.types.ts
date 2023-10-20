export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          article: string;
          created_at: string;
          seq: number;
          slug: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          article: string;
          created_at?: string;
          seq?: number;
          slug: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          article?: string;
          created_at?: string;
          seq?: number;
          slug?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      quote: {
        Row: {
          credit: string;
          id: number;
          quote: string;
        };
        Insert: {
          credit: string;
          id?: number;
          quote: string;
        };
        Update: {
          credit?: string;
          id?: number;
          quote?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
