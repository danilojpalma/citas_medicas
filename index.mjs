import express from 'express';
const app = express();
const port = 3000;
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';

app.use(express.json());

let usuarios = [];

async function registrarUsuario() {
    try {
        // Solicita 12 resultados de la API
        const response = await axios.get('https://randomuser.me/api/?results=12');
        const usuariosData = response.data.results;

        // Registra los usuarios en el array de usuarios
        usuariosData.forEach((usuario) => {
            const id = uuidv4().slice(0, 6);
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
            usuarios.push({first: usuario.name.first, last: usuario.name.last, gender: usuario.gender, id, timestamp});
        });

        // Filtra los usuarios por género después de registrar todos los usuarios
        const usuariosFemeninos = _.filter(usuarios, usuario => usuario.gender === 'female');
        const usuariosMasculinos = _.filter(usuarios, usuario => usuario.gender === 'male');

        console.log(chalk.bgWhite.blue('Pacientes Registrados:'));
        // Imprime los usuarios femeninos
        console.log(chalk.bgWhite.blue('Mujeres:'));
        let contadorMujeres = 1;
        usuariosFemeninos.forEach(usuario => {
            console.log(chalk.bgWhite.blue(`${contadorMujeres++}. Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp}`));
        });

        // Imprime los usuarios masculinos
        console.log(chalk.bgWhite.blue('Hombres:'));
        let contadorHombres = 1;
        usuariosMasculinos.forEach(usuario => {
            console.log(chalk.bgWhite.blue(`${contadorHombres++}. Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp}`));
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}

registrarUsuario();

app.get('/usuarios', (req, res) => {

     const usuariosFemeninos = _.filter(usuarios, usuario => usuario.gender === 'female');
     const usuariosMasculinos = _.filter(usuarios, usuario => usuario.gender === 'male');

     let respuestaHTML = '<h1>Pacientes Registrados</h1>';
     respuestaHTML += '<h2>Mujeres</h2>';
     let contadorMujeres = 1;
     usuariosFemeninos.forEach(usuario => {
         respuestaHTML += `<p>${contadorMujeres++}. Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp}</p>`;
     });
 
     respuestaHTML += '<h2>Hombres</h2>';
     let contadorHombres = 1;
     usuariosMasculinos.forEach(usuario => {
         respuestaHTML += `<p>${contadorHombres++}. Nombre: ${usuario.first} - Apellido: ${usuario.last} - ID: ${usuario.id} - timestamp: ${usuario.timestamp}</p>`;
     });

     
    res.send(respuestaHTML);
});



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});