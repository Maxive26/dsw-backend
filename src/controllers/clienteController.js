import { db } from "../config/db.js";

export const getAll = async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM cliente");
    res.json({ data: result.rows, count: result.rows.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los clientes" });
  }
};

export const create = async (req, res) => {
  const { DNI, nombre, mail } = req.body;
  if (!DNI || !nombre || !mail) {
    return res
      .status(400)
      .json({ message: "Faltan alguno de los datos: DNI, nombre, mail" });
  }

  try {
    const existing = await db.execute("SELECT * FROM cliente WHERE DNI = ?", [
      DNI,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "El cliente ya existe" });
    }

    await db.execute(
      "INSERT INTO cliente (DNI, nombre, mail) VALUES (?, ?, ?)",
      [DNI, nombre, mail]
    );
    res.status(201).json({ message: "Cliente creado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el cliente" });
  }
};

export const update = async (req, res) => {
  const { dni } = req.params;
  const { nombre, mail } = req.body;

  try {
    const clientExisting = await db.execute(
      "SELECT * FROM cliente WHERE DNI = ?",
      [dni]
    );

    if (clientExisting.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const campos = [];
    const valores = [];

    if (nombre !== undefined) {
      campos.push("nombre = ?");
      valores.push(nombre);
    }
    if (mail !== undefined) {
      campos.push("mail = ?");
      valores.push(mail);
    }

    if (campos.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay campos válidos para actualizar" });
    }

    valores.push(dni);
    const sql = `UPDATE cliente SET ${campos.join(", ")} WHERE DNI = ?`;

    await db.execute(sql, valores);

    return res
      .status(200)
      .json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const remove = async (req, res) => {
  const { dni } = req.params;

  try {
    const clienteExisting = await db.execute(
      "SELECT * FROM cliente WHERE DNI = ?",
      [dni]
    );

    if (clienteExisting.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await db.execute("DELETE FROM cliente WHERE DNI = ?", [dni]);

    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
