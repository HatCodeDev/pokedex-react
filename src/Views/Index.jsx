import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap"
import axios, { all } from "axios"
import { useState, useEffect } from "react"
import PokeTarjeta from "../Components/PokeTarjeta";

const Index = () => {
  const [pokemones,setPokemones] = useState([]);
  const [allpokemones,setAllPokemones] = useState([]);
  const [listado,setListado] = useState([]);
  const [filtro,setFiltro] = useState('');
  const [offset,setOffset] = useState(0);
  const [limit,setLimit] = useState(20);
  useEffect(() =>{
    getPokemones(offset)
    getAllPokemones()
  },[])


  const getPokemones = async(o) =>{
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+o;
    axios.get(liga).then( async (response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results)
      setListado(respuesta.results)
    })
  }

  const getAllPokemones = async(o) =>{
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    axios.get(liga).then( async (response) => {
      const respuesta = response.data;
      setAllPokemones(respuesta.results)
    })
  }

  const buscar = async(e) =>{
    if (e.keyCode == 13) {
      if(filtro.trim() != ''){
        setListado([]);
        setTimeout(()=>{
          setListado(allpokemones.filter(p => p.name.includes(filtro)))
        },100)
      }
    } else if(filtro.trim() == ''){
      setListado([]);
      setTimeout(()=>{
        setListado(pokemones)
      },100)
    }
  }

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3">
          <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
          <Input value={filtro} onChange={(e)=>{setFiltro(e.target.value)}} 
            onKeyUpCapture={buscar} placeholder="Buscar pokemon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {listado.map((pok,i)=>(
          <PokeTarjeta poke={pok} key={i}/>
        ))}

      </Row>
    </Container>
  )
}

export default Index