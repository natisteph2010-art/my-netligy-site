import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { c as getCurrentUserWithRole } from "./authorization-C4iwimjJ.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@netlify/identity";
import "drizzle-orm/netlify-db";
import "drizzle-orm/pg-core";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getServerUser_createServerFn_handler = createServerRpc({
  id: "49106938b52c8bf2e7795ac418917757130e43844a341613882f98c174227919",
  name: "getServerUser",
  filename: "src/lib/auth.ts"
}, (opts) => getServerUser.__executeServer(opts));
const getServerUser = createServerFn({
  method: "GET"
}).handler(getServerUser_createServerFn_handler, async () => {
  const account = await getCurrentUserWithRole();
  return account?.user ?? null;
});
export {
  getServerUser_createServerFn_handler
};
