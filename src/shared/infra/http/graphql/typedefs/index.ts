import path from "path";

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typedefs = loadFilesSync(path.join(__dirname, "."), {
  ignoreIndex: true,
});

export default mergeTypeDefs(typedefs);
