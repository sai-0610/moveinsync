const fs = require("fs");

module.exports = {
  parseJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("JSON parsing error:", err);
      return null;
    }
  },

  parseCSV(csvString) {
    const rows = csvString.trim().split("\n");
    const headers = rows.shift().split(",");

    return rows.map((row) => {
      const cols = row.split(",");
      let obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = cols[index].trim();
      });
      return obj;
    });
  },
};
