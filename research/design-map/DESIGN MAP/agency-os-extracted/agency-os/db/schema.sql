-- ============================================================
-- OMNIFORGE OS — Database Schema (Supabase / Postgres)
-- The system that documents itself. Run this once to stand up
-- the OS database, then run seed.sql to populate it.
-- ============================================================

-- 6 design families (distinct by design grammar, not colors)
CREATE TABLE IF NOT EXISTS families (
  id text PRIMARY KEY,                          -- 'industry-hospitality'
  name text NOT NULL,                           -- 'Industry & Hospitality'
  position int NOT NULL,
  visual_grammar text NOT NULL,                 -- 'editorial grid, serif support, photography-led'
  primary_buyer_need text NOT NULL,
  default_theme jsonb NOT NULL                  -- Theme contract object
);

-- 4 delivery tiers (gated by scope, not polish)
CREATE TABLE IF NOT EXISTS tiers (
  id text PRIMARY KEY,                          -- 'starter'
  name text NOT NULL,
  position int NOT NULL,                        -- 1..4
  price_hint text,                              -- '$1.5k–3k' or 'quote'
  included_modules text[] NOT NULL,
  excluded_modules text[] NOT NULL,
  integration_limits text NOT NULL,
  delivery_checklist jsonb NOT NULL
);

-- 25 core modules (theme-aware, tier-gated)
CREATE TABLE IF NOT EXISTS modules (
  id text PRIMARY KEY,                          -- 'product-detail'
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('ui','commerce','data','booking','states')),
  description text NOT NULL,
  families text[] NOT NULL,                     -- which families include it
  min_tier text NOT NULL REFERENCES tiers(id),  -- tier gating
  component_path text NOT NULL,                 -- 'commerce/product-detail.tsx'
  states text[] NOT NULL DEFAULT ARRAY['default','hover','active','focus','disabled'],
  props_schema jsonb NOT NULL DEFAULT '{}'
);

-- flagship templates (each shipped site becomes a row)
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,                    -- 'oak-and-iron'
  family_id text NOT NULL REFERENCES families(id),
  tier_min text NOT NULL REFERENCES tiers(id),
  tier_max text NOT NULL REFERENCES tiers(id),
  name text NOT NULL,
  tagline text NOT NULL,
  included_modules text[] NOT NULL,
  theme_override jsonb,                         -- NULL = family default
  live_preview_url text,
  evidence jsonb NOT NULL DEFAULT '{}',         -- a11y, perf, limitations
  created_at timestamptz DEFAULT now()
);

-- per-client projects (the cold-call reveal artifact)
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  template_id uuid NOT NULL REFERENCES templates(id),
  tier_id text NOT NULL REFERENCES tiers(id),
  content_overrides jsonb NOT NULL DEFAULT '{}',
  live_preview_url text,
  status text NOT NULL DEFAULT 'pitch'
    CHECK (status IN ('pitch','won','building','shipped','lost')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- free AI production stack catalog
CREATE TABLE IF NOT EXISTS tools (
  id text PRIMARY KEY,                          -- 'glm-5.3-flash'
  category text NOT NULL
    CHECK (category IN ('codegen','hosting','raster','vector','cms','commerce','analytics','email','testing','3d')),
  name text NOT NULL,
  free_limit text NOT NULL,
  url text NOT NULL,
  notes text
);

-- quality-gate records per release
CREATE TABLE IF NOT EXISTS qa_releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES templates(id),
  checks jsonb NOT NULL,                        -- {mobile:true, keyboard:true, reduced_motion:true, ...}
  visual_regression_baseline text,
  passed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- content override fields (what non-technical staff can swap per client)
CREATE TABLE IF NOT EXISTS content_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES templates(id),
  field_key text NOT NULL,                      -- 'hero.headline'
  label text NOT NULL,
  type text NOT NULL DEFAULT 'text'
    CHECK (type IN ('text','textarea','image','select','repeater')),
  default_value text,
  options jsonb
);

-- Row-level security: public read for showcase, authenticated write
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_families" ON families FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read_tiers" ON tiers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read_modules" ON modules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read_templates" ON templates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read_tools" ON tools FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read_content_fields" ON content_fields FOR SELECT TO anon, authenticated USING (true);
-- projects + qa_releases: staff only (authenticated)
CREATE POLICY "auth_read_projects" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_write_projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_read_qa" ON qa_releases FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_write_qa" ON qa_releases FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_write_templates" ON templates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_write_content_fields" ON content_fields FOR ALL TO authenticated USING (true) WITH CHECK (true);
