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
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          company_name: string | null
          role: string
          permissions: Json
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          company_name?: string | null
          role?: string
          permissions?: Json
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company_name?: string | null
          role?: string
          permissions?: Json
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          phone: string
          company_name: string
          website: string
          address: string
          bank_account: string
          authorized_signer: string
          id_number: string | null
          bio: string
          income_categories: Json
          expense_categories: Json
          project_types: Json
          event_types: Json
          asset_categories: Json
          sop_categories: Json
          package_categories: Json
          project_status_config: Json
          notification_settings: Json
          security_settings: Json
          briefing_template: string
          terms_and_conditions: string | null
          contract_template: string | null
          logo_base64: string | null
          brand_color: string
          public_page_config: Json
          package_share_template: string | null
          booking_form_template: string | null
          chat_templates: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string
          email?: string
          phone?: string
          company_name?: string
          website?: string
          address?: string
          bank_account?: string
          authorized_signer?: string
          id_number?: string | null
          bio?: string
          income_categories?: Json
          expense_categories?: Json
          project_types?: Json
          event_types?: Json
          asset_categories?: Json
          sop_categories?: Json
          package_categories?: Json
          project_status_config?: Json
          notification_settings?: Json
          security_settings?: Json
          briefing_template?: string
          terms_and_conditions?: string | null
          contract_template?: string | null
          logo_base64?: string | null
          brand_color?: string
          public_page_config?: Json
          package_share_template?: string | null
          booking_form_template?: string | null
          chat_templates?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          phone?: string
          company_name?: string
          website?: string
          address?: string
          bank_account?: string
          authorized_signer?: string
          id_number?: string | null
          bio?: string
          income_categories?: Json
          expense_categories?: Json
          project_types?: Json
          event_types?: Json
          asset_categories?: Json
          sop_categories?: Json
          package_categories?: Json
          project_status_config?: Json
          notification_settings?: Json
          security_settings?: Json
          briefing_template?: string
          terms_and_conditions?: string | null
          contract_template?: string | null
          logo_base64?: string | null
          brand_color?: string
          public_page_config?: Json
          package_share_template?: string | null
          booking_form_template?: string | null
          chat_templates?: Json
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          whatsapp: string | null
          instagram: string | null
          client_type: string
          status: string
          since: string
          last_contact: string
          portal_access_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          whatsapp?: string | null
          instagram?: string | null
          client_type?: string
          status?: string
          since?: string
          last_contact?: string
          portal_access_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          whatsapp?: string | null
          instagram?: string | null
          client_type?: string
          status?: string
          since?: string
          last_contact?: string
          portal_access_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          user_id: string
          name: string
          price: number
          category: string
          physical_items: Json
          digital_items: Json
          processing_time: string
          photographers: string | null
          videographers: string | null
          cover_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          price?: number
          category?: string
          physical_items?: Json
          digital_items?: Json
          processing_time?: string
          photographers?: string | null
          videographers?: string | null
          cover_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          price?: number
          category?: string
          physical_items?: Json
          digital_items?: Json
          processing_time?: string
          photographers?: string | null
          videographers?: string | null
          cover_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      add_ons: {
        Row: {
          id: string
          user_id: string
          name: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          price?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          user_id: string
          name: string
          role: string
          email: string
          phone: string
          standard_fee: number
          no_rek: string | null
          reward_balance: number
          rating: number
          performance_notes: Json
          portal_access_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          role: string
          email: string
          phone: string
          standard_fee?: number
          no_rek?: string | null
          reward_balance?: number
          rating?: number
          performance_notes?: Json
          portal_access_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          role?: string
          email?: string
          phone?: string
          standard_fee?: number
          no_rek?: string | null
          reward_balance?: number
          rating?: number
          performance_notes?: Json
          portal_access_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          client_id: string
          project_name: string
          client_name: string
          project_type: string
          package_name: string
          package_id: string | null
          add_ons: Json
          date: string
          deadline_date: string | null
          location: string
          progress: number
          status: string
          active_sub_statuses: Json
          total_cost: number
          amount_paid: number
          payment_status: string
          team: Json
          notes: string | null
          accommodation: string | null
          drive_link: string | null
          client_drive_link: string | null
          final_drive_link: string | null
          start_time: string | null
          end_time: string | null
          image: string | null
          revisions: Json
          promo_code_id: string | null
          discount_amount: number
          shipping_details: string | null
          dp_proof_url: string | null
          printing_details: Json
          printing_cost: number
          transport_cost: number
          is_editing_confirmed_by_client: boolean
          is_printing_confirmed_by_client: boolean
          is_delivery_confirmed_by_client: boolean
          confirmed_sub_statuses: Json
          client_sub_status_notes: Json
          sub_status_confirmation_sent_at: Json
          completed_digital_items: Json
          invoice_signature: string | null
          custom_sub_statuses: Json
          booking_status: string | null
          rejection_reason: string | null
          chat_history: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id: string
          project_name: string
          client_name: string
          project_type: string
          package_name: string
          package_id?: string | null
          add_ons?: Json
          date: string
          deadline_date?: string | null
          location: string
          progress?: number
          status?: string
          active_sub_statuses?: Json
          total_cost?: number
          amount_paid?: number
          payment_status?: string
          team?: Json
          notes?: string | null
          accommodation?: string | null
          drive_link?: string | null
          client_drive_link?: string | null
          final_drive_link?: string | null
          start_time?: string | null
          end_time?: string | null
          image?: string | null
          revisions?: Json
          promo_code_id?: string | null
          discount_amount?: number
          shipping_details?: string | null
          dp_proof_url?: string | null
          printing_details?: Json
          printing_cost?: number
          transport_cost?: number
          is_editing_confirmed_by_client?: boolean
          is_printing_confirmed_by_client?: boolean
          is_delivery_confirmed_by_client?: boolean
          confirmed_sub_statuses?: Json
          client_sub_status_notes?: Json
          sub_status_confirmation_sent_at?: Json
          completed_digital_items?: Json
          invoice_signature?: string | null
          custom_sub_statuses?: Json
          booking_status?: string | null
          rejection_reason?: string | null
          chat_history?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string
          project_name?: string
          client_name?: string
          project_type?: string
          package_name?: string
          package_id?: string | null
          add_ons?: Json
          date?: string
          deadline_date?: string | null
          location?: string
          progress?: number
          status?: string
          active_sub_statuses?: Json
          total_cost?: number
          amount_paid?: number
          payment_status?: string
          team?: Json
          notes?: string | null
          accommodation?: string | null
          drive_link?: string | null
          client_drive_link?: string | null
          final_drive_link?: string | null
          start_time?: string | null
          end_time?: string | null
          image?: string | null
          revisions?: Json
          promo_code_id?: string | null
          discount_amount?: number
          shipping_details?: string | null
          dp_proof_url?: string | null
          printing_details?: Json
          printing_cost?: number
          transport_cost?: number
          is_editing_confirmed_by_client?: boolean
          is_printing_confirmed_by_client?: boolean
          is_delivery_confirmed_by_client?: boolean
          confirmed_sub_statuses?: Json
          client_sub_status_notes?: Json
          sub_status_confirmation_sent_at?: Json
          completed_digital_items?: Json
          invoice_signature?: string | null
          custom_sub_statuses?: Json
          booking_status?: string | null
          rejection_reason?: string | null
          chat_history?: Json
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          date: string
          description: string
          amount: number
          type: string
          category: string
          method: string
          pocket_id: string | null
          card_id: string | null
          printing_item_id: string | null
          vendor_signature: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          date?: string
          description: string
          amount?: number
          type: string
          category: string
          method?: string
          pocket_id?: string | null
          card_id?: string | null
          printing_item_id?: string | null
          vendor_signature?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string | null
          date?: string
          description?: string
          amount?: number
          type?: string
          category?: string
          method?: string
          pocket_id?: string | null
          card_id?: string | null
          printing_item_id?: string | null
          vendor_signature?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cards: {
        Row: {
          id: string
          user_id: string
          card_holder_name: string
          bank_name: string
          card_type: string
          last_four_digits: string
          expiry_date: string | null
          balance: number
          color_gradient: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          card_holder_name: string
          bank_name: string
          card_type?: string
          last_four_digits: string
          expiry_date?: string | null
          balance?: number
          color_gradient?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          card_holder_name?: string
          bank_name?: string
          card_type?: string
          last_four_digits?: string
          expiry_date?: string | null
          balance?: number
          color_gradient?: string
          created_at?: string
          updated_at?: string
        }
      }
      pockets: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          icon: string
          type: string
          amount: number
          goal_amount: number | null
          lock_end_date: string | null
          members: Json
          source_card_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string
          icon?: string
          type: string
          amount?: number
          goal_amount?: number | null
          lock_end_date?: string | null
          members?: Json
          source_card_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          icon?: string
          type?: string
          amount?: number
          goal_amount?: number | null
          lock_end_date?: string | null
          members?: Json
          source_card_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          user_id: string
          name: string
          contact_channel: string
          location: string
          status: string
          date: string
          notes: string | null
          whatsapp: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          contact_channel: string
          location?: string
          status?: string
          date?: string
          notes?: string | null
          whatsapp?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          contact_channel?: string
          location?: string
          status?: string
          date?: string
          notes?: string | null
          whatsapp?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          purchase_date: string
          purchase_price: number
          serial_number: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          purchase_date?: string
          purchase_price?: number
          serial_number?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          purchase_date?: string
          purchase_price?: number
          serial_number?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          user_id: string
          client_id: string
          project_id: string
          contract_number: string
          signing_date: string
          signing_location: string
          client_name1: string
          client_address1: string
          client_phone1: string
          client_name2: string | null
          client_address2: string | null
          client_phone2: string | null
          shooting_duration: string
          guaranteed_photos: string
          album_details: string
          digital_files_format: string
          other_items: string
          personnel_count: string
          delivery_timeframe: string
          dp_date: string | null
          final_payment_date: string | null
          cancellation_policy: string
          jurisdiction: string
          vendor_signature: string | null
          client_signature: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id: string
          project_id: string
          contract_number: string
          signing_date?: string
          signing_location?: string
          client_name1: string
          client_address1: string
          client_phone1: string
          client_name2?: string | null
          client_address2?: string | null
          client_phone2?: string | null
          shooting_duration?: string
          guaranteed_photos?: string
          album_details?: string
          digital_files_format?: string
          other_items?: string
          personnel_count?: string
          delivery_timeframe?: string
          dp_date?: string | null
          final_payment_date?: string | null
          cancellation_policy?: string
          jurisdiction?: string
          vendor_signature?: string | null
          client_signature?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string
          project_id?: string
          contract_number?: string
          signing_date?: string
          signing_location?: string
          client_name1?: string
          client_address1?: string
          client_phone1?: string
          client_name2?: string | null
          client_address2?: string | null
          client_phone2?: string | null
          shooting_duration?: string
          guaranteed_photos?: string
          album_details?: string
          digital_files_format?: string
          other_items?: string
          personnel_count?: string
          delivery_timeframe?: string
          dp_date?: string | null
          final_payment_date?: string | null
          cancellation_policy?: string
          jurisdiction?: string
          vendor_signature?: string | null
          client_signature?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      client_feedback: {
        Row: {
          id: string
          user_id: string
          client_name: string
          satisfaction: string
          rating: number
          feedback: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_name: string
          satisfaction: string
          rating: number
          feedback: string
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_name?: string
          satisfaction?: string
          rating?: number
          feedback?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          icon: string
          is_read: boolean
          link_view: string | null
          link_action: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          icon: string
          is_read?: boolean
          link_view?: string | null
          link_action?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          icon?: string
          is_read?: boolean
          link_view?: string | null
          link_action?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      social_media_posts: {
        Row: {
          id: string
          user_id: string
          project_id: string
          client_name: string
          post_type: string
          platform: string
          scheduled_date: string
          caption: string
          media_url: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          client_name: string
          post_type: string
          platform: string
          scheduled_date?: string
          caption?: string
          media_url?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          client_name?: string
          post_type?: string
          platform?: string
          scheduled_date?: string
          caption?: string
          media_url?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          user_id: string
          code: string
          discount_type: string
          discount_value: number
          is_active: boolean
          usage_count: number
          max_usage: number | null
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          code: string
          discount_type: string
          discount_value?: number
          is_active?: boolean
          usage_count?: number
          max_usage?: number | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          code?: string
          discount_type?: string
          discount_value?: number
          is_active?: boolean
          usage_count?: number
          max_usage?: number | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sops: {
        Row: {
          id: string
          user_id: string
          title: string
          category: string
          content: string
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          category: string
          content: string
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          category?: string
          content?: string
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
      }
      team_project_payments: {
        Row: {
          id: string
          user_id: string
          project_id: string
          team_member_id: string
          team_member_name: string
          date: string
          status: string
          fee: number
          reward: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          team_member_id: string
          team_member_name: string
          date?: string
          status?: string
          fee?: number
          reward?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          team_member_id?: string
          team_member_name?: string
          date?: string
          status?: string
          fee?: number
          reward?: number
          created_at?: string
          updated_at?: string
        }
      }
      team_payment_records: {
        Row: {
          id: string
          user_id: string
          team_member_id: string
          record_number: string
          date: string
          project_payment_ids: Json
          total_amount: number
          vendor_signature: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          team_member_id: string
          record_number: string
          date?: string
          project_payment_ids?: Json
          total_amount?: number
          vendor_signature?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          team_member_id?: string
          record_number?: string
          date?: string
          project_payment_ids?: Json
          total_amount?: number
          vendor_signature?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reward_ledger_entries: {
        Row: {
          id: string
          user_id: string
          team_member_id: string
          date: string
          description: string
          amount: number
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          team_member_id: string
          date?: string
          description: string
          amount?: number
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          team_member_id?: string
          date?: string
          description?: string
          amount?: number
          project_id?: string | null
          created_at?: string
          updated_at?: string
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