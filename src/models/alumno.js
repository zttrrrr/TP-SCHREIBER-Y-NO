class Alumno {
    constructor(username = "XXXXXX", dni = "00000000", edad = 0) {

        this.username = username;
        this.dni = dni;
        this.edad = edad;
    }

    toString() {
        return `Alumno: ${this.username}, DNI: ${this.dni}, Edad: ${this.edad}`;
    }
}

export default Alumno;