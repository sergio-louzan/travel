export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string
          name: string
          icon: string
          notes: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          notes?: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          notes?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      cities: {
        Row: {
          id: string
          name: string
          country_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          country_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          country_id?: string
          created_at?: string
          user_id?: string
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          content: string
          city_id: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          content?: string
          city_id: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          city_id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 