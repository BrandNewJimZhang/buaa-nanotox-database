import mysql from 'mysql2/promise';

export default async function getData(req, res) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'zhw20000810',
    database: 'test'
  });

  try {
    const [rows] = await connection.query('SELECT * FROM original_dataset');
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  };
};