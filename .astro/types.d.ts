declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"about-us.md": {
	id: "about-us.md";
  slug: "about-us";
  body: string;
  collection: "about";
  data: InferEntrySchema<"about">
} & { render(): Render[".md"] };
};
"posts": {
"aloe-vera/index.md": {
	id: "aloe-vera/index.md";
  slug: "aloe-vera";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apparel-brands-go-green/index.md": {
	id: "apparel-brands-go-green/index.md";
  slug: "apparel-brands-go-green";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"areca-palm/index.md": {
	id: "areca-palm/index.md";
  slug: "areca-palm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"artotel-bamboo/index.md": {
	id: "artotel-bamboo/index.md";
  slug: "artotel-bamboo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"asbestos/index.md": {
	id: "asbestos/index.md";
  slug: "asbestos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"asean-against-plastic-pollution/index.md": {
	id: "asean-against-plastic-pollution/index.md";
  slug: "asean-against-plastic-pollution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bali-agri-tradeshow/index.md": {
	id: "bali-agri-tradeshow/index.md";
  slug: "bali-agri-tradeshow";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bali-plastic-bags-ban/index.md": {
	id: "bali-plastic-bags-ban/index.md";
  slug: "bali-plastic-bags-ban";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bali-solar-energy/index.md": {
	id: "bali-solar-energy/index.md";
  slug: "bali-solar-energy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bali-water-protection/index.md": {
	id: "bali-water-protection/index.md";
  slug: "bali-water-protection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bali-wave-energy-park/index.md": {
	id: "bali-wave-energy-park/index.md";
  slug: "bali-wave-energy-park";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"balsa-wood-surfboards/index.md": {
	id: "balsa-wood-surfboards/index.md";
  slug: "balsa-wood-surfboards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bamboo-bicycles/index.md": {
	id: "bamboo-bicycles/index.md";
  slug: "bamboo-bicycles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bamboo-buildings-in-bali/index.md": {
	id: "bamboo-buildings-in-bali/index.md";
  slug: "bamboo-buildings-in-bali";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bamboo-straws/index.md": {
	id: "bamboo-straws/index.md";
  slug: "bamboo-straws";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bambu-indah/index.md": {
	id: "bambu-indah/index.md";
  slug: "bambu-indah";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bandwidth-and-economic-wealth/index.md": {
	id: "bandwidth-and-economic-wealth/index.md";
  slug: "bandwidth-and-economic-wealth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bedroom-plants/index.md": {
	id: "bedroom-plants/index.md";
  slug: "bedroom-plants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"benefits-of-spirulina/index.md": {
	id: "benefits-of-spirulina/index.md";
  slug: "benefits-of-spirulina";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bio-cement/index.md": {
	id: "bio-cement/index.md";
  slug: "bio-cement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"biocoenosis-natural-forests/index.md": {
	id: "biocoenosis-natural-forests/index.md";
  slug: "biocoenosis-natural-forests";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"biodegradable-indonesian-plastic/index.md": {
	id: "biodegradable-indonesian-plastic/index.md";
  slug: "biodegradable-indonesian-plastic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"brazilian-reclaimed-wood/index.md": {
	id: "brazilian-reclaimed-wood/index.md";
  slug: "brazilian-reclaimed-wood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"building-with-bamboo/index.md": {
	id: "building-with-bamboo/index.md";
  slug: "building-with-bamboo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"byebye-plastic-bags/index.md": {
	id: "byebye-plastic-bags/index.md";
  slug: "byebye-plastic-bags";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"charging-stations-coming/index.md": {
	id: "charging-stations-coming/index.md";
  slug: "charging-stations-coming";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chrysanthemum-power/index.md": {
	id: "chrysanthemum-power/index.md";
  slug: "chrysanthemum-power";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"consumers-want-sustainability/index.md": {
	id: "consumers-want-sustainability/index.md";
  slug: "consumers-want-sustainability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cool-reclaimed-wood-lamps/index.md": {
	id: "cool-reclaimed-wood-lamps/index.md";
  slug: "cool-reclaimed-wood-lamps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dracena-benefits/index.md": {
	id: "dracena-benefits/index.md";
  slug: "dracena-benefits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eco-bali/index.md": {
	id: "eco-bali/index.md";
  slug: "eco-bali";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eco-regions-indonesia/index.md": {
	id: "eco-regions-indonesia/index.md";
  slug: "eco-regions-indonesia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"electric-cars-in-thailand/index.md": {
	id: "electric-cars-in-thailand/index.md";
  slug: "electric-cars-in-thailand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"energy-saving-bulbs/index.md": {
	id: "energy-saving-bulbs/index.md";
  slug: "energy-saving-bulbs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"et-foldable-scooter/index.md": {
	id: "et-foldable-scooter/index.md";
  slug: "et-foldable-scooter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"evoware-not-plastic/index.md": {
	id: "evoware-not-plastic/index.md";
  slug: "evoware-not-plastic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fern-eliminate-air-pollutants/index.md": {
	id: "fern-eliminate-air-pollutants/index.md";
  slug: "fern-eliminate-air-pollutants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fight-inflammation-with-food/index.md": {
	id: "fight-inflammation-with-food/index.md";
  slug: "fight-inflammation-with-food";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flax-is-a-superfood/index.md": {
	id: "flax-is-a-superfood/index.md";
  slug: "flax-is-a-superfood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"food-safe-plastic/index.md": {
	id: "food-safe-plastic/index.md";
  slug: "food-safe-plastic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gardens-by-the-bay/index.md": {
	id: "gardens-by-the-bay/index.md";
  slug: "gardens-by-the-bay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ginger-is-good/index.md": {
	id: "ginger-is-good/index.md";
  slug: "ginger-is-good";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"golden-pothos/index.md": {
	id: "golden-pothos/index.md";
  slug: "golden-pothos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"green-school-bali/index.md": {
	id: "green-school-bali/index.md";
  slug: "green-school-bali";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"green-walls/index.md": {
	id: "green-walls/index.md";
  slug: "green-walls";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gringgo-smarter-waste-collection/index.md": {
	id: "gringgo-smarter-waste-collection/index.md";
  slug: "gringgo-smarter-waste-collection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"honda-electric-cub/index.md": {
	id: "honda-electric-cub/index.md";
  slug: "honda-electric-cub";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"immune-boost-drinks/index.md": {
	id: "immune-boost-drinks/index.md";
  slug: "immune-boost-drinks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"indonesian-reclaimed-wood/index.md": {
	id: "indonesian-reclaimed-wood/index.md";
  slug: "indonesian-reclaimed-wood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"indonesian-waste-platform/index.md": {
	id: "indonesian-waste-platform/index.md";
  slug: "indonesian-waste-platform";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"maya-green-roof/index.md": {
	id: "maya-green-roof/index.md";
  slug: "maya-green-roof";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"microplastic-in-your-salt/index.md": {
	id: "microplastic-in-your-salt/index.md";
  slug: "microplastic-in-your-salt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moringa-superfood/index.md": {
	id: "moringa-superfood/index.md";
  slug: "moringa-superfood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mosquito-repellent-plants/index.md": {
	id: "mosquito-repellent-plants/index.md";
  slug: "mosquito-repellent-plants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"neem-tree/index.md": {
	id: "neem-tree/index.md";
  slug: "neem-tree";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"paper-towels/index.md": {
	id: "paper-towels/index.md";
  slug: "paper-towels";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"peace-lilies/index.md": {
	id: "peace-lilies/index.md";
  slug: "peace-lilies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"plastic-bags/index.md": {
	id: "plastic-bags/index.md";
  slug: "plastic-bags";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"plastic-roads/index.md": {
	id: "plastic-roads/index.md";
  slug: "plastic-roads";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"racing-to-clean/index.md": {
	id: "racing-to-clean/index.md";
  slug: "racing-to-clean";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"raising-awareness/index.md": {
	id: "raising-awareness/index.md";
  slug: "raising-awareness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"recycling-aluminum/index.md": {
	id: "recycling-aluminum/index.md";
  slug: "recycling-aluminum";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rethink-plastic/index.md": {
	id: "rethink-plastic/index.md";
  slug: "rethink-plastic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"singapore-botanic-gardens/index.md": {
	id: "singapore-botanic-gardens/index.md";
  slug: "singapore-botanic-gardens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"snake-plant/index.md": {
	id: "snake-plant/index.md";
  slug: "snake-plant";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sos-from-the-deep/index.md": {
	id: "sos-from-the-deep/index.md";
  slug: "sos-from-the-deep";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stop-alien-species/index.md": {
	id: "stop-alien-species/index.md";
  slug: "stop-alien-species";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sustainable-wood/index.md": {
	id: "sustainable-wood/index.md";
  slug: "sustainable-wood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ocean-cleanup/index.md": {
	id: "the-ocean-cleanup/index.md";
  slug: "the-ocean-cleanup";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trash-hero/index.md": {
	id: "trash-hero/index.md";
  slug: "trash-hero";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"travellers-choose-sustainability/index.md": {
	id: "travellers-choose-sustainability/index.md";
  slug: "travellers-choose-sustainability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"up-cycled-glass/index.md": {
	id: "up-cycled-glass/index.md";
  slug: "up-cycled-glass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vegetable-block-printing/index.md": {
	id: "vegetable-block-printing/index.md";
  slug: "vegetable-block-printing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"xiaomi-electric-scooter/index.md": {
	id: "xiaomi-electric-scooter/index.md";
  slug: "xiaomi-electric-scooter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zero-electric-motorcycles/index.md": {
	id: "zero-electric-motorcycles/index.md";
  slug: "zero-electric-motorcycles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zooming-in-on-biodiversity/index.md": {
	id: "zooming-in-on-biodiversity/index.md";
  slug: "zooming-in-on-biodiversity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
