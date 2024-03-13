import {
  pgTable,
  serial,
  text,
  integer,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const ReviewsTable = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    author: text('author').notNull(),
    content: text('content').notNull(),
    movieId: integer('movie_id').notNull(),
  },
)

export type Review = InferSelectModel<typeof ReviewsTable>
export type NewReview = InferInsertModel<typeof ReviewsTable>

// Connect to Vercel Postgres
export const db = drizzle(sql)
