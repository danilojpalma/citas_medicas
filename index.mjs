import express from 'express';
const app = express();
const port = 3000;
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';

app.use(express.json());
const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

let usuarios = [];

async function registrarUsuario() {
    for (let i = 0; i < 12; i++) {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=12');
        const usuario = response.data.results[i];
        const id = uuidv4().slice(0, 6);
        usuarios.push({...usuario, id, timestamp });
        console.log(chalk.bgWhite.blue(`#${i + 1}. Nombre: ${usuario.name.first} - Apellido: ${usuario.name.last} - ID: ${id} - timestamp: ${timestamp}`));
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}
}

registrarUsuario();

app.get('/usuarios', (req, res) => {

     const usuariosPorGenero = _.groupBy(usuarios, 'gender');

     let respuestaHTML = '<h1>Usuarios Registrados</h1>';
     respuestaHTML += '<h2>Mujeres</h2>';
     let contadorMujeres = 1;
     usuariosPorGenero['female'].forEach(usuario => {
         respuestaHTML += `<p>${contadorMujeres++}. Nombre: ${usuario.name.first} - Apellido: ${usuario.name.last} - ID: ${usuario.id} - timestamp: ${timestamp}</p>`;
     });
 
     respuestaHTML += '<h2>Hombres</h2>';
     let contadorHombres = 1;
     usuariosPorGenero['male'].forEach(usuario => {
         respuestaHTML += `<p>${contadorHombres++}. Nombre: ${usuario.name.first} - Apellido: ${usuario.name.last} - ID: ${usuario.id} - timestamp: ${timestamp}</p>`;
     });

     
    res.send(respuestaHTML);
});



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});