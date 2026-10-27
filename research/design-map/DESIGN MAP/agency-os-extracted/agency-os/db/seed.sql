-- ============================================================
-- OMNIFORGE OS — Seed data
-- ============================================================

INSERT INTO families (id, name, position, visual_grammar, primary_buyer_need, default_theme) VALUES
('micro-products','Micro Products',1,'Bold type, short sections, decisive CTA','Buy/download quickly',
 '{"color":{"bg":"#0a0a0a","fg":"#f5f1e8","accent":"#d4ff3a"},"typography":{"display":"Anton","body":"DM Sans","mono":"JetBrains Mono"},"spacing":"tight","radius":"small","motion":"standard","density":"balanced"}'),
('industry-hospitality','Industry & Hospitality',2,'Editorial grid, serif support type, photography-led','Trust, atmosphere, booking',
 '{"color":{"bg":"#0d0a08","fg":"#ede4d3","accent":"#c8954a","accent2":"#8b1e1e"},"typography":{"display":"Anton","serif":"Playfair Display","body":"DM Sans","mono":"JetBrains Mono"},"spacing":"generous","radius":"none","motion":"minimal","density":"airy"}'),
('data-dashboards','Data Dashboards',3,'Dense panels, mono type, tables, status colors','Monitor and decide',
 '{"color":{"bg":"#0c0e10","fg":"#e8eaed","accent":"#22c55e","danger":"#ef4444"},"typography":{"display":"Space Grotesk","body":"Inter","mono":"JetBrains Mono"},"spacing":"tight","radius":"none","motion":"minimal","density":"dense"}'),
('saas-products','SaaS Products',4,'Product UI, clear hierarchy, feature proof','Understand and trial',
 '{"color":{"bg":"#0a0a0f","fg":"#f0f0f5","accent":"#6366f1"},"typography":{"display":"Space Grotesk","body":"Inter"},"spacing":"balanced","radius":"medium","motion":"standard","density":"balanced"}'),
('enterprise-platforms','Enterprise Platforms',5,'Structured navigation, evidence, permissions, KPIs','Evaluate risk and capability',
 '{"color":{"bg":"#0f1114","fg":"#e5e7eb","accent":"#0891b2"},"typography":{"display":"Inter","body":"Inter","mono":"JetBrains Mono"},"spacing":"balanced","radius":"small","motion":"minimal","density":"dense"}'),
('consumer-goods','Consumer Goods Catalog',6,'Product-first photography, benefit-led copy, fast retail + separate wholesale path','Fast retail purchase, trust, tracking',
 '{"color":{"bg":"#faf7f2","fg":"#2b1d14","accent":"#b87333","surface":"#ffffff"},"typography":{"display":"Fraunces","body":"DM Sans","mono":"JetBrains Mono"},"spacing":"balanced","radius":"medium","motion":"standard","density":"airy"}');

INSERT INTO tiers (id, name, position, price_hint, included_modules, excluded_modules, integration_limits, delivery_checklist) VALUES
('starter','Starter',1,'$1.5k–3k',
 ARRAY['navigation','hero','cta','cards','pricing','faq','contact'],
 ARRAY['cart','checkout','booking','tracking','dashboard','auth','analytics'],
 'No custom flow, no integrations, no bespoke motion',
 '{"mobile":true,"keyboard":true,"reduced_motion":true,"contrast":true,"states":true,"real_data":true,"visual_regression":false}'),
('growth','Growth',2,'$3k–8k',
 ARRAY['navigation','hero','cta','cards','pricing','faq','contact','cart','checkout','reviews','tracking','analytics'],
 ARRAY['booking','dashboard','auth','supplier-portal'],
 'CMS content, 1–2 integrations, custom theme. Limited custom components',
 '{"mobile":true,"keyboard":true,"reduced_motion":true,"contrast":true,"states":true,"real_data":true,"visual_regression":true}'),
('professional','Professional',3,'$8k–25k',
 ARRAY['navigation','hero','cta','cards','pricing','faq','contact','cart','checkout','booking','quote-request','reviews','tracking','analytics','product-grid','product-detail','dashboard-panels'],
 ARRAY['supplier-portal','erp-connection','multi-region','audit-trails'],
 'Custom module composition, tailored user flow, commerce/booking integration, motion direction, QA',
 '{"mobile":true,"keyboard":true,"reduced_motion":true,"contrast":true,"states":true,"real_data":true,"visual_regression":true,"performance_budget":true}'),
('enterprise','Enterprise',4,'Quote',
 ARRAY['*'], ARRAY[],
 'Bespoke strategy, brand direction, original components, advanced integrations, dashboards/roles, audit trails, ongoing support. Quote-led',
 '{"mobile":true,"keyboard":true,"reduced_motion":true,"contrast":true,"states":true,"real_data":true,"visual_regression":true,"performance_budget":true,"a11y_audit":true,"pen_test":true,"sla":true}');

INSERT INTO modules (id, name, category, description, families, min_tier, component_path, states) VALUES
('navigation','Navigation','ui','Sticky header, mobile drawer, anchor links',ARRAY['*'],'starter','ui/navigation.tsx',ARRAY['default','scrolled','mobile-open']),
('hero','Hero','ui','Full-bleed hero with headline, CTA, signature motion slot',ARRAY['*'],'starter','patterns/hero.tsx',ARRAY['default','reduced-motion']),
('cta','CTA Block','ui','Decisive call-to-action band',ARRAY['*'],'starter','patterns/cta.tsx',ARRAY['default','hover']),
('cards','Card Grid','ui','Flexible card grid with image, copy, link',ARRAY['*'],'starter','ui/cards.tsx',ARRAY['default','hover','focus']),
('pricing','Pricing Tiers','ui','Tier comparison with featured card',ARRAY['*'],'starter','patterns/pricing.tsx',ARRAY['default','featured']),
('faq','FAQ Accordion','ui','Expandable Q&A',ARRAY['*'],'starter','ui/faq.tsx',ARRAY['collapsed','expanded']),
('contact','Contact Form','booking','Form with validation + toast',ARRAY['*'],'starter','booking/contact.tsx',ARRAY['idle','submitting','success','error']),
('product-grid','Product Grid','commerce','Filterable product grid with category chips',ARRAY['consumer-goods','micro-products'],'growth','commerce/product-grid.tsx',ARRAY['default','filtered','empty']),
('product-detail','Product Detail','commerce','Gallery, price hierarchy, color/size, add-to-cart',ARRAY['consumer-goods','micro-products'],'growth','commerce/product-detail.tsx',ARRAY['default','selected','added']),
('cart','Cart','commerce','Session cart with count badge + drawer',ARRAY['consumer-goods','micro-products'],'growth','commerce/cart.tsx',ARRAY['empty','items','checkout']),
('checkout','Checkout','commerce','Stripe Checkout link / Shopify Buy Button',ARRAY['consumer-goods','micro-products','saas-products'],'growth','commerce/checkout.tsx',ARRAY['redirect','processing','success','failed']),
('reviews','Reviews','commerce','Star ratings + testimonial quotes',ARRAY['consumer-goods','industry-hospitality'],'growth','commerce/reviews.tsx',ARRAY['default','loading']),
('tracking','Order Tracking','commerce','Fulfillment timeline (received→packed→dispatched→delivered)',ARRAY['consumer-goods'],'growth','commerce/tracking.tsx',ARRAY['steps','delivered','not-found']),
('quote-request','Wholesale Quote','booking','Separate B2B path: volume pricing request',ARRAY['consumer-goods','enterprise-platforms'],'professional','booking/quote-request.tsx',ARRAY['idle','submitted']),
('booking','Booking Flow','booking','Service + staff + date + time slot picker',ARRAY['industry-hospitality'],'growth','booking/booking.tsx',ARRAY['selecting','confirmed']),
('analytics','Analytics Events','data','Plausible/PostHog funnel: view→cart→checkout→purchase',ARRAY['*'],'growth','engine/analytics.ts',ARRAY['fired']),
('dashboard-panels','Dashboard Panels','data','Bento KPI tiles with status colors',ARRAY['data-dashboards','saas-products','enterprise-platforms'],'professional','data/panels.tsx',ARRAY['default','loading','empty']),
('data-table','Data Table','data','Dense sortable table with pagination',ARRAY['data-dashboards','enterprise-platforms'],'professional','data/table.tsx',ARRAY['default','sorted','empty']),
('charts','Charts','data','SVG line/bar/area, animated on scroll',ARRAY['data-dashboards','saas-products'],'professional','data/charts.tsx',ARRAY['default','animated']),
('auth','Authentication','ui','Sign-in/up, session, protected routes',ARRAY['saas-products','enterprise-platforms'],'professional','ui/auth.tsx',ARRAY['signed-out','signed-in','error']),
('settings','Settings','ui','Profile, preferences, theme switcher',ARRAY['saas-products','enterprise-platforms'],'professional','ui/settings.tsx',ARRAY['default','saved']),
('empty-state','Empty State','states','Styled empty with illustration + CTA',ARRAY['*'],'starter','states/empty.tsx',ARRAY['empty']),
('error-state','Error State','states','Friendly failure with retry',ARRAY['*'],'starter','states/error.tsx',ARRAY['error']),
('loading-state','Loading State','states','Skeleton / spinner with brand motion',ARRAY['*'],'starter','states/loading.tsx',ARRAY['loading']),
('out-of-stock','Out of Stock','states','Sold-out badge + notify-me form',ARRAY['consumer-goods','micro-products'],'growth','states/out-of-stock.tsx',ARRAY['sold-out','notify']);

INSERT INTO tools (id, category, name, free_limit, url, notes) VALUES
('glm-5.3-flash','codegen','GLM-5.3-Flash','Unlimited, no login','https://chat.z.ai','Full HTML/Tailwind files, R3F components, shaders'),
('gemini-flash','codegen','Google AI Studio (Gemini 1.5 Flash)','1M tokens/day','https://aistudio.google.com','Long-context refactors, doc→code'),
('vercel','hosting','Vercel free','100 GB bandwidth/mo','https://vercel.com','Next.js deploys, instant preview URLs'),
('github-pages','hosting','GitHub Pages','Unlimited static','https://pages.github.com','Single-file flagships'),
('tensor-art','raster','Tensor.Art (SDXL)','100 gens/day','https://tensor.art','No watermark, free downloads'),
('bing-image','raster','Bing Image Creator','15 boosts/day','https://bing.com/create','DALL-E 3 quality'),
('recraft','vector','Recraft.ai','50 vectors free','https://recraft.ai','Icons, geometric backgrounds'),
('payload','cms','Payload 2.0','MIT, self-host','https://payloadcms.com','TypeScript-first, lives inside Next.js'),
('sanity','cms','Sanity free','3 users, 10k docs','https://sanity.io','Faster setup than Payload'),
('stripe','commerce','Stripe Checkout','2.9% + 30¢/txn','https://stripe.com','Don''t build payment infra'),
('medusa','commerce','Medusa','Open source','https://medusajs.com','Self-host Shopify alternative'),
('plausible','analytics','Plausible self-host','Free','https://plausible.io','Privacy-friendly, no cookie banner'),
('posthog','analytics','PostHog free','1M events/mo','https://posthog.com','Funnel events + session replay'),
('resend','email','Resend free','3k/mo, 100/day','https://resend.com','Transactional + lead forms'),
('formspree','email','Formspree free','50/mo','https://formspree.io','Lead capture on Starter'),
('playwright','testing','Playwright','Open source','https://playwright.dev','Visual regression + e2e purchase flows'),
('three','3d','Three.js / drei','Open source','https://threejs.org','ProductShowcase, FabricScene, ParticleField modules');

INSERT INTO templates (slug, family_id, tier_min, tier_max, name, tagline, included_modules, theme_override, live_preview_url, evidence) VALUES
('oak-and-iron','industry-hospitality','growth','professional','OAK & IRON Barber Co.','Editorial barbershop with 3D scissors, animated street scene, booking flow, click-to-snip',
 ARRAY['navigation','hero','cards','product-grid','booking','reviews','tracking','faq','contact','empty-state','loading-state','error-state'],
 '{"color":{"bg":"#0d0a08","fg":"#ede4d3","accent":"#c8954a","accent2":"#8b1e1e"}}',
 '/flagships/oak-and-iron/index.html',
 '{"wcag":"AA","reduced_motion":true,"keyboard":true,"mobile":true,"performance":"LCP < 2.5s","limitations":["picsum/loremflickr placeholders","booking form is mock (no backend)"]}'),
('vanta-athletic','consumer-goods','starter','growth','VANTA Athletic','Performance apparel & equipment store — kinetic 3D hero, product grid, cart, member tiers',
 ARRAY['navigation','hero','cards','product-grid','cart','pricing','faq','contact','reviews','empty-state'],
 '{"color":{"bg":"#0a0a0a","fg":"#f5f1e8","accent":"#d4ff3a","accent2":"#ff4d1a"}}',
 '/flagships/vanta-athletic/index.html',
 '{"wcag":"AA","reduced_motion":true,"keyboard":true,"mobile":true,"limitations":["cart is mock","no real payment"]}'),
('meridian-roast','consumer-goods','growth','growth','MERIDIAN ROAST Co.','Specialty coffee roaster — Consumer Goods flagship #2 with Theme token contract, roast filter, cart, reviews, tracking timeline',
 ARRAY['navigation','hero','product-grid','product-detail','cart','checkout','reviews','tracking','faq','contact','reviews','out-of-stock','empty-state','loading-state','error-state'],
 '{"color":{"bg":"#faf7f2","fg":"#2b1d14","accent":"#b87333"}}',
 '/flagships/meridian-roast/index.html',
 '{"wcag":"AA","reduced_motion":true,"keyboard":true,"mobile":true,"limitations":["Stripe Checkout is a link, not wired","tracking is mock timeline"]}');

INSERT INTO projects (client_name, template_id, tier_id, status, notes) VALUES
('Demo Prospect A', (SELECT id FROM templates WHERE slug='oak-and-iron'), 'growth', 'pitch', 'Northside barbershop, walked in — send live link'),
('Demo Prospect B', (SELECT id FROM templates WHERE slug='meridian-roast'), 'growth', 'pitch', 'Local roastery on Alberta St');
