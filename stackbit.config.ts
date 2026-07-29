import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
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
                    fields: [{ name: "title", type: "string", required: true }]
                }
            ]
        })
    ],
    pageModels: ["Page"],
    siteMap: ({ documents, models }) => {
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
                };
            }) as SiteMapEntry[];
    }
});
