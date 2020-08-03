import axios from 'axios';
import store from '../store'

export async function cursos(){
    try {
        await axios.get('https://us-central1-apiclub-d7567.cloudfunctions.net/apiClub/cursos')
        .then(response => {
            console.log(response.data);
            store.dispatch("llamadoApiCursos", response.data)
            
        }) 
       } catch(error) {
            console.log("Error", error); 
        }

}