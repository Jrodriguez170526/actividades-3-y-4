import Database from "better-sqlite3";

export function getAllVentas(dbName) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM ventas");
    const ventas = stmt.all();
    db.close();
    return ventas;
}

export function getVentaById(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM ventas WHERE id = ?");
    const venta = stmt.get(id);
    db.close();
    return venta;
}


export function createVenta(dbName, { fecha, total }) {
    const db = new Database(dbName);
    const stmt = db.prepare("INSERT INTO ventas (fecha, total) VALUES (?, ?)");
    const info = stmt.run(fecha, total);
    db.close();
    return { message: "Venta insertada correctamente", id: info.lastInsertRowid };
}

export function updateVenta(dbName, id, { fecha, total }) {
    const db = new Database(dbName);
    const stmt = db.prepare("UPDATE ventas SET fecha = ?, total = ? WHERE id = ?");
    const info = stmt.run(fecha, total, id);
    db.close();
    return { message: "Venta actualizada correctamente", changes: info.changes };
}

export function partialUpdateVenta(dbName, id, updates) {
    const db = new Database(dbName);
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(updates), id];
    const stmt = db.prepare(`UPDATE ventas SET ${fields} WHERE id = ?`);
    const info = stmt.run(...values);
    db.close();
    return { message: "Venta parcialmente actualizada", changes: info.changes };
}

export function deleteVenta(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("DELETE FROM ventas WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return { message: "Venta eliminada", changes: info.changes };
}