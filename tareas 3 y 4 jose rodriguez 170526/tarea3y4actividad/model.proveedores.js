import Database from "better-sqlite3";

export function getAllProveedores(dbName) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM proveedores");
    const proveedores = stmt.all();
    db.close();
    return proveedores;
}

export function getProveedorById(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM proveedores WHERE id = ?");
    const proveedor = stmt.get(id);
    db.close();
    return proveedor;
}

export function createProveedor(dbName, { nombre, direccion, telefono }) {
    const db = new Database(dbName);
    const stmt = db.prepare("INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)");
    const info = stmt.run(nombre, direccion, telefono);
    db.close();
    return { message: "Proveedor insertado correctamente", id: info.lastInsertRowid };
}

export function updateProveedor(dbName, id, { nombre, direccion, telefono }) {
    const db = new Database(dbName);
    const stmt = db.prepare("UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?");
    const info = stmt.run(nombre, direccion, telefono, id);
    db.close();
    return { message: "Proveedor actualizado correctamente", changes: info.changes };
}

export function partialUpdateProveedor(dbName, id, updates) {
    const db = new Database(dbName);
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(updates), id];
    const stmt = db.prepare(`UPDATE proveedores SET ${fields} WHERE id = ?`);
    const info = stmt.run(...values);
    db.close();
    return { message: "Proveedor parcialmente actualizado", changes: info.changes };
}

export function deleteProveedor(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("DELETE FROM proveedores WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return { message: "Proveedor eliminado", changes: info.changes };
}