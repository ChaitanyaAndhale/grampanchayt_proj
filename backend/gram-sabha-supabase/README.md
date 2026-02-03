# Gram Sabha Supabase Project

This project is designed to manage Gram Sabha records using Supabase as the backend. It provides an interface for admins to create, update, and delete records, as well as a frontend component for displaying these records.

## Project Structure

```
gram-sabha-supabase
├── src
│   ├── api
│   │   └── admin
│   │       └── gramSabha.ts          # Supabase queries for managing Gram Sabha records
│   ├── components
│   │   └── GramSabhaSection.tsx      # React component for displaying Gram Sabha records
│   ├── hooks
│   │   └── useGramSabha.ts           # Custom hook for fetching and managing records
│   ├── lib
│   │   └── supabaseClient.ts          # Supabase client initialization
│   ├── services
│   │   └── gramSabhaService.ts        # Service functions for CRUD operations
│   ├── types
│   │   └── gramSabha.ts               # TypeScript types and interfaces
│   ├── utils
│   │   └── validators.ts              # Utility functions for data validation
│   └── db
│       ├── migrations
│       │   └── 001_create_gram_sabha.sql  # SQL migration script
│       └── seed
│           └── seed_gram_sabha.sql   # SQL script for seeding initial records
├── .env.example                        # Example environment variables
├── package.json                       # npm configuration file
├── tsconfig.json                      # TypeScript configuration file
└── README.md                          # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd gram-sabha-supabase
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env` and fill in your Supabase credentials.

4. **Run Migrations**
   - Execute the SQL migration script to create the necessary database table.
   ```bash
   # Use your preferred method to run SQL scripts against your Supabase database
   ```

5. **Seed the Database**
   - Optionally, run the seed script to populate the database with initial records for testing.
   ```bash
   # Use your preferred method to run SQL scripts against your Supabase database
   ```

## Usage

- The admin can manage Gram Sabha records through the API defined in `src/api/admin/gramSabha.ts`.
- The frontend component `GramSabhaSection.tsx` displays the records and allows interaction.
- Use the custom hook `useGramSabha.ts` to fetch and manage records in your components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.