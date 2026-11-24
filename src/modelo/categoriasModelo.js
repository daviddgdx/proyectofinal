const pool = require('../config/bd');

class CategoriasModelo {
    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM categorias');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async crearCategoria(nombre) {
        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
        return { id_categoria: result.insertId, nombre };
    }

    static async actualizarCategoria(id, campo, valor) {
        const camposPermitidos = ['nombre', 'descripcion'];
        if (!camposPermitidos.includes(campo)) {
            throw new Error('Campo no permitido para actualizar');
        }
        await pool.query(`UPDATE categorias SET ${campo} = ? WHERE id_categoria = ?`, [valor, id]);
        return { id_categoria: id, [campo]: valor };
    }

    static async eliminarCategoria(id) {
        await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
        return { id_categoria: id };
    }
}

module.exports = CategoriasModelo;