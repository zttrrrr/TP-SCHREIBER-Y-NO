/* Este es el módulo "matematicas" */
const PI = 3.14;
function sumar(x, y) {
    return x + y;
}
const multiplicacion = (a, b) => {
    return a * b;
};
function restar(a, b) {
     return a - b;
};
const division = (a, b) => (b !== 0 ? a / b : "Error: No se puede divir por cero");

const textoNums = ["dos", "cuatro", "ocho", "diez"];

// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export { PI, sumar, restar, multiplicacion, division, textoNums };