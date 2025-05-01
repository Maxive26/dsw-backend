import Sucursal from "../models/sucursal.js";

let sucursales = [];

export const getAll = (req, res) => {
  res.json(sucursales);
};

export const create = (req, res) => {
  const { idSucursal, nombre, direccion } = req.body;
  const nuevaSucursal = new Sucursal(idSucursal, nombre, direccion);
  sucursales.push(nuevaSucursal);
  res.status(201).json(nuevaSucursal);
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nombre, direccion } = req.body;
  const sucursal = sucursales.find((s) => s.idSucursal === id);
  if (!sucursal) {
    return res.status(404).json({ message: "Sucursal no encontrada" });
  }
  sucursal.nombre = nombre ?? sucursal.nombre;
  sucursal.direccion = direccion ?? sucursal.direccion;
  res.json(sucursal);
};

export const remove = (req, res) => {
  const { id } = req.params;
  const index = sucursales.findIndex((s) => s.idSucursal === id);
  if (index === -1) {
    return res.status(404).json({ message: "Sucursal no encontrada" });
  }
  sucursales.splice(index, 1);
  res.json({ message: "Sucursal eliminada" });
};
