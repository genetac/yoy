import type { SiteWorld } from '../SiteTemplate';

/** Every flagship model receives the full resolved world — copy, tokens,
 *  effective switch picks, overridden switches and the structural hero
 *  arrangement. Nothing about a model's response to a switch is hidden. */
export type TemplateProps = { world: SiteWorld };
