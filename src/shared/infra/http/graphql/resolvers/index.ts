import path from "path";

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolvers = loadFilesSync(path.join(__dirname, "."), {
  ignoreIndex: true,
});

export default mergeResolvers(resolvers);
