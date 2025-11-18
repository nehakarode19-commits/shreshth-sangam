export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          admin_comments: string | null
          applied_date: string | null
          coordinator_contact: string | null
          coordinator_name: string | null
          created_at: string | null
          hostel_id: string | null
          id: string
          institution_id: string | null
          interview_date: string | null
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          admin_comments?: string | null
          applied_date?: string | null
          coordinator_contact?: string | null
          coordinator_name?: string | null
          created_at?: string | null
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          interview_date?: string | null
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          admin_comments?: string | null
          applied_date?: string | null
          coordinator_contact?: string | null
          coordinator_name?: string | null
          created_at?: string | null
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          interview_date?: string | null
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          id: string
          publish_date: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          publish_date?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          publish_date?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_reply: string | null
          category: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          admin_reply?: string | null
          category?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_reply?: string | null
          category?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string | null
          donation_date: string | null
          donor_id: string
          hostel_id: string | null
          id: string
          institution_id: string | null
          payment_method: string | null
          purpose: string | null
          receipt_url: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donation_date?: string | null
          donor_id: string
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          payment_method?: string | null
          purpose?: string | null
          receipt_url?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donation_date?: string | null
          donor_id?: string
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          payment_method?: string | null
          purpose?: string | null
          receipt_url?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          impact_level: string | null
          name: string
          pan: string | null
          phone: string | null
          total_donated: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          impact_level?: string | null
          name: string
          pan?: string | null
          phone?: string | null
          total_donated?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          impact_level?: string | null
          name?: string
          pan?: string | null
          phone?: string | null
          total_donated?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          address: string | null
          category: string | null
          city: string | null
          created_at: string | null
          created_by: string | null
          days: number | null
          description: string | null
          event_date: string | null
          id: string
          state: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          days?: number | null
          description?: string | null
          event_date?: string | null
          id?: string
          state?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          days?: number | null
          description?: string | null
          event_date?: string | null
          id?: string
          state?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hostels: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          admin_id: string | null
          city: string | null
          created_at: string | null
          email: string | null
          facilities: string[] | null
          funding_needed: number | null
          funding_type: string | null
          govt_support: boolean | null
          hostel_type: string | null
          id: string
          monthly_operational_cost: number | null
          name: string
          number_of_rooms: number | null
          occupied_count: number | null
          phone: string | null
          pincode: string | null
          room_types: string[] | null
          state: string | null
          status: string | null
          total_capacity: number
          type: string
          updated_at: string | null
          website: string | null
          year_established: number | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          admin_id?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          facilities?: string[] | null
          funding_needed?: number | null
          funding_type?: string | null
          govt_support?: boolean | null
          hostel_type?: string | null
          id?: string
          monthly_operational_cost?: number | null
          name: string
          number_of_rooms?: number | null
          occupied_count?: number | null
          phone?: string | null
          pincode?: string | null
          room_types?: string[] | null
          state?: string | null
          status?: string | null
          total_capacity: number
          type: string
          updated_at?: string | null
          website?: string | null
          year_established?: number | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          admin_id?: string | null
          city?: string | null
          created_at?: string | null
          email?: string | null
          facilities?: string[] | null
          funding_needed?: number | null
          funding_type?: string | null
          govt_support?: boolean | null
          hostel_type?: string | null
          id?: string
          monthly_operational_cost?: number | null
          name?: string
          number_of_rooms?: number | null
          occupied_count?: number | null
          phone?: string | null
          pincode?: string | null
          room_types?: string[] | null
          state?: string | null
          status?: string | null
          total_capacity?: number
          type?: string
          updated_at?: string | null
          website?: string | null
          year_established?: number | null
        }
        Relationships: []
      }
      institutions: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          admin_id: string | null
          city: string | null
          created_at: string | null
          departments: string[] | null
          email: string | null
          id: string
          name: string
          phone: string | null
          pincode: string | null
          staff_count: number | null
          state: string | null
          status: string | null
          total_students: number | null
          trustee_contact: string | null
          trustee_name: string | null
          type: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          admin_id?: string | null
          city?: string | null
          created_at?: string | null
          departments?: string[] | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          pincode?: string | null
          staff_count?: number | null
          state?: string | null
          status?: string | null
          total_students?: number | null
          trustee_contact?: string | null
          trustee_name?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          admin_id?: string | null
          city?: string | null
          created_at?: string | null
          departments?: string[] | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          pincode?: string | null
          staff_count?: number | null
          state?: string | null
          status?: string | null
          total_students?: number | null
          trustee_contact?: string | null
          trustee_name?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      media_gallery: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          tags: string[] | null
          title: string | null
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          tags?: string[] | null
          title?: string | null
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          tags?: string[] | null
          title?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          id: string
          media_url: string | null
          thumbnail_url: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          media_url?: string | null
          thumbnail_url?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          media_url?: string | null
          thumbnail_url?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      press_coverage: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          link: string | null
          media_type: string | null
          publish_date: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          media_type?: string | null
          publish_date?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          media_type?: string | null
          publish_date?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: number | null
          application_deadline: string | null
          created_at: string | null
          description: string | null
          eligibility_criteria: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          application_deadline?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_criteria?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          application_deadline?: string | null
          created_at?: string | null
          description?: string | null
          eligibility_criteria?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          alt_mobile: string | null
          board: string | null
          city: string | null
          created_at: string | null
          current_class: string | null
          current_institution: string | null
          dietary_preference: string | null
          district: string | null
          dob: string | null
          email: string | null
          first_name: string
          gender: string | null
          guardian_contact: string | null
          guardian_name: string | null
          id: string
          language_preference: string | null
          last_name: string
          last_school: string | null
          marks_percentage: number | null
          medium: string | null
          middle_name: string | null
          mobile: string | null
          pincode: string | null
          preferred_cities: string[] | null
          relationship: string | null
          religion_community: string | null
          school_type: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          willing_to_relocate: boolean | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          alt_mobile?: string | null
          board?: string | null
          city?: string | null
          created_at?: string | null
          current_class?: string | null
          current_institution?: string | null
          dietary_preference?: string | null
          district?: string | null
          dob?: string | null
          email?: string | null
          first_name: string
          gender?: string | null
          guardian_contact?: string | null
          guardian_name?: string | null
          id?: string
          language_preference?: string | null
          last_name: string
          last_school?: string | null
          marks_percentage?: number | null
          medium?: string | null
          middle_name?: string | null
          mobile?: string | null
          pincode?: string | null
          preferred_cities?: string[] | null
          relationship?: string | null
          religion_community?: string | null
          school_type?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          alt_mobile?: string | null
          board?: string | null
          city?: string | null
          created_at?: string | null
          current_class?: string | null
          current_institution?: string | null
          dietary_preference?: string | null
          district?: string | null
          dob?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          guardian_contact?: string | null
          guardian_name?: string | null
          id?: string
          language_preference?: string | null
          last_name?: string
          last_school?: string | null
          marks_percentage?: number | null
          medium?: string | null
          middle_name?: string | null
          mobile?: string | null
          pincode?: string | null
          preferred_cities?: string[] | null
          relationship?: string | null
          religion_community?: string | null
          school_type?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          status: string | null
          subject: string
          submitted_by: string | null
          ticket_number: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          subject: string
          submitted_by?: string | null
          ticket_number?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          subject?: string
          submitted_by?: string | null
          ticket_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trustees: {
        Row: {
          compliance_score: number | null
          created_at: string | null
          designation: string | null
          email: string | null
          hostel_id: string | null
          id: string
          institution_id: string | null
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          compliance_score?: number | null
          created_at?: string | null
          designation?: string | null
          email?: string | null
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          compliance_score?: number | null
          created_at?: string | null
          designation?: string | null
          email?: string | null
          hostel_id?: string | null
          id?: string
          institution_id?: string | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trustees_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trustees_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "student"
        | "parent"
        | "trustee"
        | "admin"
        | "hostel_admin"
        | "institution_admin"
        | "donor"
        | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "student",
        "parent",
        "trustee",
        "admin",
        "hostel_admin",
        "institution_admin",
        "donor",
        "super_admin",
      ],
    },
  },
} as const
