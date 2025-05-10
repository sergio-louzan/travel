-- Create tables with RLS (Row Level Security) enabled

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security on all tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create policies for each table

-- Countries policies
CREATE POLICY "Users can view their own countries" 
  ON countries FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own countries" 
  ON countries FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own countries" 
  ON countries FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own countries" 
  ON countries FOR DELETE 
  USING (auth.uid() = user_id);

-- Cities policies
CREATE POLICY "Users can view their own cities" 
  ON cities FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cities" 
  ON cities FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cities" 
  ON cities FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cities" 
  ON cities FOR DELETE 
  USING (auth.uid() = user_id);

-- Pages policies
CREATE POLICY "Users can view their own pages" 
  ON pages FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pages" 
  ON pages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pages" 
  ON pages FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pages" 
  ON pages FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS countries_user_id_idx ON countries(user_id);
CREATE INDEX IF NOT EXISTS cities_country_id_idx ON cities(country_id);
CREATE INDEX IF NOT EXISTS cities_user_id_idx ON cities(user_id);
CREATE INDEX IF NOT EXISTS pages_city_id_idx ON pages(city_id);
CREATE INDEX IF NOT EXISTS pages_user_id_idx ON pages(user_id); 