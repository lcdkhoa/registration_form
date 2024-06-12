import mysql from "mysql";

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
  if (req.method === "POST") {
    const input = req.body;

    const sql = `INSERT INTO formdangky (fullName, class, dob, gender, address, parentName, phone1, phone2, signature, className, classTime, classSchedule, fee, classStartDate, classDuration, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const createAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const values = [
      input.fullName,
      input.class,
      input.dob,
      input.gender,
      input.address,
      input.parentName,
      input.phone1,
      input.phone2,
      input.signature,
      input.className,
      input.classTime,
      input.classSchedule,
      input.fee,
      input.classStartDate,
      input.classDuration,
      createAt,
    ];

    connection.query(sql, values, function (error, results) {
      if (error) {
        res
          .status(500)
          .json({ message: "Error inserting data into the database", error });
        return;
      }
      res.status(200).json({ id: results.insertId });
    });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
