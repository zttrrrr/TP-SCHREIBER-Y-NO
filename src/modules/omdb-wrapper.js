/* Módulo  OMDBWrapper*/
import axios from "axios";


const APIKEY = "6a8a98ac";        // Poné tu APIKEY, esta no funciona.


const OMDBSearchByPage = async (searchText, page = 1) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };


    try {
        const respuesta = await axios.get("https://www.omdbapi.com/", {
          params: {
            apikey: APIKEY,
            s: searchText,
            page: page
          }
        });
    
        if (respuesta.data.Response === "True") {
          returnObject.respuesta = true;
          returnObject.cantidadTotal = parseInt(respuesta.data.totalResults);
          returnObject.datos = respuesta.data.Search;
        }
      } catch (error) {
        console.error("Error en OMDBSearchByPage:", error.message);
      }
    
  return returnObject;

};


const OMDBSearchComplete = async (searchText) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };


    try {
        const primeraPagina = await OMDBSearchByPage(searchText, 1);
    
        if (primeraPagina.respuesta) {
          returnObject.respuesta = true;
          returnObject.cantidadTotal = primeraPagina.cantidadTotal;
          returnObject.datos = primeraPagina.datos;
    
          const totalPaginas = Math.ceil(primeraPagina.cantidadTotal / 10);
    
          for (let page = 2; page <= totalPaginas; page++) {
            const pagina = await OMDBSearchByPage(searchText, page);
            if (pagina.respuesta) {
              returnObject.datos.push(...pagina.datos);
            }
          }
        }
      } catch (error) {
        console.error("Error en OMDBSearchComplete:", error.message);
      }
  return returnObject;

};


const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : {}

    };


    try {
        const respuesta = await axios.get("https://www.omdbapi.com/", {
          params: {
            apikey: APIKEY,
            i: imdbID
          }
        });
    
        if (respuesta.data.Response === "True") {
          returnObject.respuesta = true;
          returnObject.cantidadTotal = 1;
          returnObject.datos = respuesta.data;
        }
      } catch (error) {
        console.error("Error en OMDBGetByImdbID:", error.message);
      }

  return returnObject;

};



export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};