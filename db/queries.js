import { pool } from "./pool.js";

const db = {
  async getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  },
  async createMessage(username, msg) {
    await pool.query(
      "INSERT INTO messages (username, msg_cont) VALUES ($1, $2)",
      [username, msg]
    );
  },
  async searchUser(query) {
    const { rows } = await pool.query(
      "SELECT username, id FROM messages WHERE username ILIKE $1", // ILIKE for case-insensitive search
      [`%${query}%`]
    );
    return rows;
  },
};

export { db };
