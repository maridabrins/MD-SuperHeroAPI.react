import { React, useState, useEffect } from "react";
import api from "../../Services/api.js";
import './home.css';

export default function Home(){
    const [ herois, setHerois ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        async function mostrarHerois() {
            setLoading(true)
            try{
                const response = await api.get("/all.json")
                setHerois(response.data)
                setLoading(false)
            }catch(erro){
                console.error("Erro ao tentar buscar os super-herois!", erro)
            }
        }
        mostrarHerois()
    }, [])

    if(loading){
        return (
            <div className="loading-content">
                <h2>Buscando...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Super-Hérois</h1>
            <h2>Resultados</h2>
            <div className="lista">
                {herois.map((heroi)=>(
                    <article key={heroi.id}>

                        <div className="herois-card">
                            <img src={heroi.images.sm} alt={`Imagem do filme ${heroi.name}`}></img>

                            <div className="heroi-infos">
                                <p>#{heroi.id}</p>
                                <h3>{heroi.name}</h3>
                            </div>
                            <p id="bio">{heroi.biography.publisher}</p>
                        </div>
                    </article>
                ))}
            </div>
            
        </div>
    )
}