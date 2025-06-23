import Profesional from "../models/profesional.js";
import { db } from "../config/db.js";

let profesionales = [];

export const getAll = async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM profesional");
    const response = {
      data: result.rows,
      count: result.rows.length,
    };
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los profesionales" });
  }
};

// FALTA HACER VALIDACIONES, Si el profesional ya existe
export const create = async (req, res) => {
  const { legajo, nombre, mail, idSucursal } = req.body;
  if (!legajo || !nombre || !mail || !idSucursal)
    return res.status(400).json({
      message: "Faltan datos obligatorios: legajo, nombre, mail, idSucursal",
    });

  try {
    const newProfesional = await db.execute(
      "INSERT INTO profesional (legajo, nombre, mail, idSucursal) VALUES (?, ?, ?, ?)",
      [legajo, nombre, mail, idSucursal]
    );
    res.status(201).json({ message: "Profesional creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el profesional" });
  }
};

export const update = async (req, res) => {
  const { legajo } = req.params;
  const { nombre, mail, idSucursal } = req.body;

  try {
    const profesional = await db.execute(
      "SELECT * FROM profesional WHERE legajo = ?",
      [legajo]
    );

    if (profesional.rows.length === 0)
      return res.status(404).json({ message: "Profesional no encontrado" });

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

    if (idSucursal !== undefined && idSucursal !== "") {
      campos.push("idSucursal = ?");
      valores.push(idSucursal);
    }

    if (campos.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay campos válidos para actualizar" });
    }

    valores.push(legajo);
    const sql = `UPDATE profesional SET ${campos.join(", ")} WHERE legajo = ?`;

    await db.execute(sql, valores);

    return res
      .status(200)
      .json({ message: "Profesional actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const remove = async (req, res) => {
  const { legajo } = req.params;
  try {
    const deleteProfesional = await db.execute(
      "SELECT * FROM profesional WHERE legajo = ?",
      [legajo]
    );

    if (deleteProfesional.rows.length === 0)
      return res.status(404).json({ message: "Profesional no encontrado" });

    await db.execute("DELETE FROM profesional WHERE legajo = ?", [legajo]);

    res.status(200).json({ message: "Profesional eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
