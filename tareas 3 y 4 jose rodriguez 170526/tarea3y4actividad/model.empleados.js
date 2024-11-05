import Database from "better-sqlite3";

export function getAllEmployees(dbName) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM empleados");
    const employees = stmt.all();
    db.close();
    return employees;
}

export function getEmployeeById(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("SELECT * FROM empleados WHERE id = ?");
    const employee = stmt.get(id);
    db.close();
    return employee;
}

export function createEmployee(dbName, { nombre, puesto, telefono, email }) {
    const db = new Database(dbName);
    const stmt = db.prepare("INSERT INTO empleados (nombre, puesto, telefono, email) VALUES (?, ?, ?, ?)");
    const info = stmt.run(nombre, puesto, telefono, email);
    db.close();
    return { message: "Empleado insertado correctamente", id: info.lastInsertRowid };
}

export function updateEmployee(dbName, id, { nombre, puesto, telefono, email }) {
    const db = new Database(dbName);
    const stmt = db.prepare("UPDATE empleados SET nombre = ?, puesto = ?, telefono = ?, email = ? WHERE id = ?");
    const info = stmt.run(nombre, puesto, telefono, email, id);
    db.close();
    return { message: "Empleado actualizado correctamente", changes: info.changes };
}

export function partialUpdateEmployee(dbName, id, updates) {
    const db = new Database(dbName);
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(", ");
    const values = [...Object.values(updates), id];
    const stmt = db.prepare(`UPDATE empleados SET ${fields} WHERE id = ?`);
    const info = stmt.run(...values);
    db.close();
    return { message: "Empleado parcialmente actualizado", changes: info.changes };
}

export function deleteEmployee(dbName, id) {
    const db = new Database(dbName);
    const stmt = db.prepare("DELETE FROM empleados WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return { message: "Empleado eliminado", changes: info.changes };
}