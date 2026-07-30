import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    stackbitVersion: "0.6.0",
                // small shared strings
                { name: "pinnedLabel", type: "string" }
    ssgName: "custom",
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: "Page",
                    type: "page",
                    urlPath: "/{slug}",
                    filePath: "content/pages/{slug}.json",
                    fields: [
                        { name: "title", type: "string", required: true },
                        { name: "heroKicker", type: "string" },
                        { name: "heroEyebrow", type: "string" },
                        { name: "heroHeadline", type: "string" },
                        { name: "heroHighlight", type: "string" },
                        { name: "heroSubtitle", type: "string" },
                        { name: "heroPrimaryCta", type: "string" },
                        { name: "heroSecondaryCta", type: "string" },
                        {
                            name: "stats",
                            type: "list",
                            items: {
                                type: "object",
                                fields: [
                                    { name: "value", type: "string" },
                                    { name: "label", type: "string" },
                                    { name: "icon", type: "string" }
                                ]
                            }
                        },
                        { name: "aboutEyebrow", type: "string" },
                        { name: "aboutTitle", type: "string" },
                        { name: "aboutBody1", type: "string" },
                        { name: "aboutBody2", type: "string" },
                        {
                            name: "aboutCards",
                            type: "list",
                            items: {
                                type: "object",
                                fields: [
                                    { name: "icon", type: "string" },
                                    { name: "title", type: "string" },
                                    { name: "value", type: "string" },
                                    { name: "desc", type: "string" }
                                ]
                            }
                        },
                        { name: "programsEyebrow", type: "string" },
                        { name: "programsTitle", type: "string" },
                        {
                            name: "programCards",
                            type: "list",
                            items: {
                                type: "object",
                                fields: [
                                    { name: "icon", type: "string" },
                                    { name: "eyebrow", type: "string" },
                                    { name: "title", type: "string" },
                                    { name: "description", type: "string" },
                                    {
                                        name: "benefits",
                                        type: "list",
                                        items: { type: "string" }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            // Add a site-level data model for shared UI text and assets
            {
                name: "Site",
                type: "data",
                filePath: "content/site.json",
                fields: [
                    {
                        name: "logo",
                        type: "object",
                        fields: [
                            { name: "src", type: "string" },
                            { name: "alt", type: "string" }
                        ]
                    },
                    { name: "overlayTitle", type: "string" },
                    {
                        name: "hubNodes",
                        type: "list",
                        items: {
                            type: "object",
                            fields: [
                                { name: "label", type: "string" },
                                { name: "symbol", type: "string" }
                            ]
                        }
                    }
                ]
            }
        })
    ],
    sitemap: ({ documents, models }) => {
        const pageModels = models.filter((m) => m.type === "page");
        return documents
            .filter((d) => pageModels.some((m) => m.name === d.modelName))
            .map((document) => {
                const isHome = document.id === "content/pages/home.json";
                return {
                    stableId: document.id,
                    urlPath: isHome ? "/" : `/${document.id.replace("content/pages/", "").replace(".json", "")}`,
                    document,
                    isHomePage: isHome
                } as SiteMapEntry;
            });
    }
});
