import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    stackbitVersion: "0.6.0",
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
                        { name: "stats", type: "list" },
                        { name: "aboutEyebrow", type: "string" },
                        { name: "aboutTitle", type: "string" },
                        { name: "aboutBody1", type: "string" },
                        { name: "aboutBody2", type: "string" },
                        { name: "aboutCards", type: "list" },
                        { name: "programsEyebrow", type: "string" },
                        { name: "programsTitle", type: "string" },
                        { name: "programCards", type: "list" }
                    ]
                }
            ]
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
