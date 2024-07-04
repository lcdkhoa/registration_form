import mysql from "mysql2";
const XLSX = require("xlsx");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12712758",
  password: "jGpFrWpjdE",
  database: "sql12712758",
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const sql = `SELECT * FROM formdangky`;

    try {
      const [results] = await connection.promise().query(sql);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(results);
      XLSX.utils.book_append_sheet(wb, ws, "Results");
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="danh-sach-dang-ky.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.end(buf);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error retrieving data from the database", error });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
