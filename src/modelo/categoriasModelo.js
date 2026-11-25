const db = require('../config/bd');

class CategoriasModelo {
  static async obtenerTodas() {
    const [filas] = await db.query('SELECT id_categoria, nombre FROM categorias');
    return filas;
  }

  static async obtenerPorId(id) {
    const [filas] = await db.query(
      'SELECT id_categoria, nombre FROM categorias WHERE id_categoria = ?',
      [id]
    );
    return filas[0] || null;
  }

  static async crear(nombre) {
    const [resultado] = await db.query(
      'INSERT INTO categorias (nombre) VALUES (?)',
      [nombre]
    );
    return { id_categoria: resultado.insertId, nombre };
  }

  static async actualizar(id, nombre) {
    const [resultado] = await db.query(
      'UPDATE categorias SET nombre = ? WHERE id_categoria = ?',
      [nombre, id]
    );
    return resultado.affectedRows > 0;
  }

  static async eliminar(id) {
    const [resultado] = await db.query(
      'DELETE FROM categorias WHERE id_categoria = ?',
      [id]
    );
    return resultado.affectedRows > 0;
  }
}

module.exports = CategoriasModelo;