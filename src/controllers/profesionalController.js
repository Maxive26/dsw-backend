import Profesional from "../models/profesional.js";

let profesionales = [];

export const getAll = (req, res) => {
  res.json(profesionales);
};

export const create = (req, res) => {
  const { legajo, nombre, mail, idSucursal } = req.body;
  const nuevoProfesional = new Profesional(legajo, nombre, mail, idSucursal);
  profesionales.push(nuevoProfesional);
  res.status(201).json(nuevoProfesional);
};

export const update = (req, res) => {
  const { legajo } = req.params;
  const { nombre, mail, idSucursal } = req.body;
  const profesional = profesionales.find((p) => p.legajo === legajo);
  if (!profesional) {
    return res.status(404).json({ message: "Profesional no encontrado" });
  }
  profesional.nombre = nombre ?? profesional.nombre;
  profesional.mail = mail ?? profesional.mail;
  profesional.idSucursal = idSucursal ?? profesional.idSucursal;
  res.json(profesional);
};

export const remove = (req, res) => {
  const { legajo } = req.params;
  const index = profesionales.findIndex((p) => p.legajo === legajo);
  if (index === -1) {
    return res.status(404).json({ message: "Profesional no encontrado" });
  }
  profesionales.splice(index, 1);
  res.json({ message: "Profesional eliminado" });
};
