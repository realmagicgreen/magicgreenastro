declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}
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
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

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
	type ImageFunction = () => import('astro/zod').ZodObject<{
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

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | (({ image }: { image: ImageFunction }) => S);
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"about": {
"about-us.md": {
  id: "about-us.md",
  slug: "about-us",
  body: string,
  collection: "about",
  data: InferEntrySchema<"about">
} & { render(): Render[".md"] },
},
"health": {
"aloe-vera.md": {
  id: "aloe-vera.md",
  slug: "aloe-vera",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"areca-palm.md": {
  id: "areca-palm.md",
  slug: "areca-palm",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"asbestos.md": {
  id: "asbestos.md",
  slug: "asbestos",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"bedroom-plants.md": {
  id: "bedroom-plants.md",
  slug: "bedroom-plants",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"benefits-of-spirulina.md": {
  id: "benefits-of-spirulina.md",
  slug: "benefits-of-spirulina",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"dracaena-benefits.md": {
  id: "dracaena-benefits.md",
  slug: "dracaena-benefits",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"eliminate-air-pollutants.md": {
  id: "eliminate-air-pollutants.md",
  slug: "eliminate-air-pollutants",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"fight-inflammation-with-food.md": {
  id: "fight-inflammation-with-food.md",
  slug: "fight-inflammation-with-food",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"flax-is-a-superfood.md": {
  id: "flax-is-a-superfood.md",
  slug: "flax-is-a-superfood",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"ginger-is-good.md": {
  id: "ginger-is-good.md",
  slug: "ginger-is-good",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"golden-pothos.md": {
  id: "golden-pothos.md",
  slug: "golden-pothos",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"immune-boost-drinks.md": {
  id: "immune-boost-drinks.md",
  slug: "immune-boost-drinks",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"moringa-superfood.md": {
  id: "moringa-superfood.md",
  slug: "moringa-superfood",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"neem-tree.md": {
  id: "neem-tree.md",
  slug: "neem-tree",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"peace-lilies.md": {
  id: "peace-lilies.md",
  slug: "peace-lilies",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
"snake-plant.md": {
  id: "snake-plant.md",
  slug: "snake-plant",
  body: string,
  collection: "health",
  data: InferEntrySchema<"health">
} & { render(): Render[".md"] },
},
"know": {
"apparel-brands-go-green.md": {
  id: "apparel-brands-go-green.md",
  slug: "apparel-brands-go-green",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"bandwidth-and-economic-wealth.md": {
  id: "bandwidth-and-economic-wealth.md",
  slug: "bandwidth-and-economic-wealth",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"chrysanthemum-power.md": {
  id: "chrysanthemum-power.md",
  slug: "chrysanthemum-power",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"consumers-want-sustainability.md": {
  id: "consumers-want-sustainability.md",
  slug: "consumers-want-sustainability",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"energy-saving-bulbs.md": {
  id: "energy-saving-bulbs.md",
  slug: "energy-saving-bulbs",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"food-safe-plastic.md": {
  id: "food-safe-plastic.md",
  slug: "food-safe-plastic",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"microplastic-in-your-salt.md": {
  id: "microplastic-in-your-salt.md",
  slug: "microplastic-in-your-salt",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"paper-towels.md": {
  id: "paper-towels.md",
  slug: "paper-towels",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"plastic-bags.md": {
  id: "plastic-bags.md",
  slug: "plastic-bags",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"recycling-aluminum.md": {
  id: "recycling-aluminum.md",
  slug: "recycling-aluminum",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"travellers-choose-sustainability.md": {
  id: "travellers-choose-sustainability.md",
  slug: "travellers-choose-sustainability",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
"zooming-in-on-biodiversity.md": {
  id: "zooming-in-on-biodiversity.md",
  slug: "zooming-in-on-biodiversity",
  body: string,
  collection: "know",
  data: InferEntrySchema<"know">
} & { render(): Render[".md"] },
},
"products": {
"balsa-surfboards.md": {
  id: "balsa-surfboards.md",
  slug: "balsa-surfboards",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"bamboo-bicycles.md": {
  id: "bamboo-bicycles.md",
  slug: "bamboo-bicycles",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"bamboo-straws.md": {
  id: "bamboo-straws.md",
  slug: "bamboo-straws",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"biodegradable-indonesian-plastic.md": {
  id: "biodegradable-indonesian-plastic.md",
  slug: "biodegradable-indonesian-plastic",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"brazilian-reclaimed-wood.md": {
  id: "brazilian-reclaimed-wood.md",
  slug: "brazilian-reclaimed-wood",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"cool-reclaimed-wood-lamps.md": {
  id: "cool-reclaimed-wood-lamps.md",
  slug: "cool-reclaimed-wood-lamps",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"et-foldable-scooter.md": {
  id: "et-foldable-scooter.md",
  slug: "et-foldable-scooter",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"evoware-not-plastic.md": {
  id: "evoware-not-plastic.md",
  slug: "evoware-not-plastic",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"honda-electric-cub.md": {
  id: "honda-electric-cub.md",
  slug: "honda-electric-cub",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"indonesian-reclaimed-wood.md": {
  id: "indonesian-reclaimed-wood.md",
  slug: "indonesian-reclaimed-wood",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"xiaomi-electric-scooter.md": {
  id: "xiaomi-electric-scooter.md",
  slug: "xiaomi-electric-scooter",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
"zero-electric-motorcycles.md": {
  id: "zero-electric-motorcycles.md",
  slug: "zero-electric-motorcycles",
  body: string,
  collection: "products",
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] },
},
"services": {
"bali-agri-tradeshow.md": {
  id: "bali-agri-tradeshow.md",
  slug: "bali-agri-tradeshow",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
"bambu-indah.md": {
  id: "bambu-indah.md",
  slug: "bambu-indah",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
"eco-bali.md": {
  id: "eco-bali.md",
  slug: "eco-bali",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
"green-school-bali.md": {
  id: "green-school-bali.md",
  slug: "green-school-bali",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
"stations-coming.md": {
  id: "stations-coming.md",
  slug: "stations-coming",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
"sustainable-wood.md": {
  id: "sustainable-wood.md",
  slug: "sustainable-wood",
  body: string,
  collection: "services",
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] },
},
"solutions": {
"artotel-bamboo.md": {
  id: "artotel-bamboo.md",
  slug: "artotel-bamboo",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"asean-against-plastic-pollution.md": {
  id: "asean-against-plastic-pollution.md",
  slug: "asean-against-plastic-pollution",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bali-plastic-bags-ban.md": {
  id: "bali-plastic-bags-ban.md",
  slug: "bali-plastic-bags-ban",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bali-solar-energy.md": {
  id: "bali-solar-energy.md",
  slug: "bali-solar-energy",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bali-water-protection.md": {
  id: "bali-water-protection.md",
  slug: "bali-water-protection",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bali-wave-energy-park.md": {
  id: "bali-wave-energy-park.md",
  slug: "bali-wave-energy-park",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bamboo-buildings-in-bali.md": {
  id: "bamboo-buildings-in-bali.md",
  slug: "bamboo-buildings-in-bali",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"bio-cement.md": {
  id: "bio-cement.md",
  slug: "bio-cement",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"byebye-plastic-bags.md": {
  id: "byebye-plastic-bags.md",
  slug: "byebye-plastic-bags",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"eco-regions-indonesia.md": {
  id: "eco-regions-indonesia.md",
  slug: "eco-regions-indonesia",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"electric-cars-in-thailand.md": {
  id: "electric-cars-in-thailand.md",
  slug: "electric-cars-in-thailand",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"gardens-by-the-bay.md": {
  id: "gardens-by-the-bay.md",
  slug: "gardens-by-the-bay",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"green-walls.md": {
  id: "green-walls.md",
  slug: "green-walls",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"gringgo-smarter-waste-collection.md": {
  id: "gringgo-smarter-waste-collection.md",
  slug: "gringgo-smarter-waste-collection",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"indonesian-waste-platform.md": {
  id: "indonesian-waste-platform.md",
  slug: "indonesian-waste-platform",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"maya-green-roof.md": {
  id: "maya-green-roof.md",
  slug: "maya-green-roof",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"mosquito-repellent-plants.md": {
  id: "mosquito-repellent-plants.md",
  slug: "mosquito-repellent-plants",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"plastic-roads.md": {
  id: "plastic-roads.md",
  slug: "plastic-roads",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"raising-awareness.md": {
  id: "raising-awareness.md",
  slug: "raising-awareness",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"singapore-botanic-gardens.md": {
  id: "singapore-botanic-gardens.md",
  slug: "singapore-botanic-gardens",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"sos-from-the-deep.md": {
  id: "sos-from-the-deep.md",
  slug: "sos-from-the-deep",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"stop-alien-species.md": {
  id: "stop-alien-species.md",
  slug: "stop-alien-species",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"the-ocean-cleanup.md": {
  id: "the-ocean-cleanup.md",
  slug: "the-ocean-cleanup",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
"trash-hero.md": {
  id: "trash-hero.md",
  slug: "trash-hero",
  body: string,
  collection: "solutions",
  data: InferEntrySchema<"solutions">
} & { render(): Render[".md"] },
},
"techniques": {
"building-with-bamboo.md": {
  id: "building-with-bamboo.md",
  slug: "building-with-bamboo",
  body: string,
  collection: "techniques",
  data: InferEntrySchema<"techniques">
} & { render(): Render[".md"] },
"racing-to-clean.md": {
  id: "racing-to-clean.md",
  slug: "racing-to-clean",
  body: string,
  collection: "techniques",
  data: InferEntrySchema<"techniques">
} & { render(): Render[".md"] },
"rethink-plastic.md": {
  id: "rethink-plastic.md",
  slug: "rethink-plastic",
  body: string,
  collection: "techniques",
  data: InferEntrySchema<"techniques">
} & { render(): Render[".md"] },
"up-cycled-glass.md": {
  id: "up-cycled-glass.md",
  slug: "up-cycled-glass",
  body: string,
  collection: "techniques",
  data: InferEntrySchema<"techniques">
} & { render(): Render[".md"] },
"vegetable-block-printing.md": {
  id: "vegetable-block-printing.md",
  slug: "vegetable-block-printing",
  body: string,
  collection: "techniques",
  data: InferEntrySchema<"techniques">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
