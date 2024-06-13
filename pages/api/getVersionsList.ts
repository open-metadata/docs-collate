import fs from "fs";
import { ARTICLES_DIRECTORY } from "../../docs-v1/constants/common.constants";

// API to get versions list from the content folder

export default function handler(req, res) {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    const versionOptionsObj = versionsArray.map((version) => ({
      label: version,
      value: version,
    }));

    res.status(200).json(versionOptionsObj);
  } catch (err) {
    res.status(err.code === "ENOENT" ? 404 : 400).send(err);
  }
}
