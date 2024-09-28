import { useEffect, useState } from "react";

export const WinesGalleryFetch = () => {

    //  Estado para almacenar los vinos en un array
    const [wines, setWines] = useState([]);
    
    // Estado para manejar posibles errores
    const [error, setError] = useState(null);

    // Filtro
    const [filter, setFilter] = useState('');

    // Método para realizar la petición a la API con fetch
    const fetchData = async () => {

        try {
            const response = await fetch('https://api.sampleapis.com/wines/reds');

            // Convertimos la respuesta a JSON por no nos devuelven en dicho formato
            const data = await response.json();

            // Setear la variable de estado del wine través de su método setWines con los datos recibidos de la API
            setWines(data);
        
        } catch (error) {
            console.log('Error al realizar la solicitud', error);
            setError('Error al realizar la solicitud');
        }
    };

    // useEffect ejecuta el método fetchdata la primera vez que se monta el componente, hace petición de la API.
    useEffect(() => {
        fetchData();
    }, []);

    // Si hay error que muestre el mensaje
    if (error) {
        return(
            <div className="alert alert-danger text-center" role='alert'>
                {error}
            </div>
        );
    }

    // Filtrar basado en el estado de los vinos
    const filteredWines = wines.filter(wine =>
        wine.location.toLowerCase().includes(filter.toLowerCase())
    );

    return (
    <div className="container mt-5">
        <h2 className="text-center text-white mb-4">Cave of Wines</h2>
        
        {/* Input para el filtro */}
        <div className="mb-4">
            <input 
                type="text"
                className="form-control"
                placeholder="Buscar por país:"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
        
        {/* Agregamos un contenedor scroll y altura fija */}
        <div className="row overflow-auto vh-80" style= {{maxHeight: '80vH', overflowY: 'scroll'}}>
                {filteredWines.map((wine, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-wine">
                                <img src={wine.image} className="card-img-top object-fit-cover image" alt="Wine" />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Wine name:{wine.wine} {index + 1}</h5>
                                <p className="card-text">{ wine.winery }</p>
                                <p className="card-text">{ wine.location }</p>
                                <p className="card-text">{ wine.rating.average }</p>
                                <p className="card-text">{ wine.rating.reviews }</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
  )
}
