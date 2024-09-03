import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import PokeTarjeta from "../Components/PokeTarjeta";

const Index = () => {
  const [pokemones,setPokemones] = useState([]);
  const [offset,setOffset] = useState(0);
  const [limit,setLimit] = useState(20);
  useEffect(() =>{
    getPokemones(offset)
  },[])


  const getPokemones = async(o) =>{
    const liga = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+o;
    axios.get(liga).then( async (response) => {
      const respuesta = response.data;
      setPokemones(respuesta.results)
      console.log(pokemones)
    })
  }

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3">
          <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
          <Input placeholder="Buscar pokemon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {pokemones.map((pok,i)=>(
          <PokeTarjeta poke={pok} key={i}/>
        ))}

      </Row>
    </Container>
  )
}

export default Index