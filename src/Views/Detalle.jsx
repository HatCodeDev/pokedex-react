import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Row, Col, Card, CardBody,CardText, Badge, Progress } from "reactstrap"
import PokeTarjeta from "../Components/PokeTarjeta"
import axios from "axios"

const Detalle = () => {
  const {id} = useParams();
  const [pokemon,setPokemon] = useState([]);
  const [especie,setEspecie] = useState([]);
  const [habitat,setHabitat] = useState('Desconocido');
  const [descripcion,setDescripcion] = useState([]);
  const [imagen,setImagen] = useState([]);
  const [tipos,setTipos] = useState([]);
  const [cardClass,setCardClass] = useState('d-none');
  const [loadClass,setLoadClass] = useState('');
  useEffect(() =>{
    getPokemon()
  },[])
  const getPokemon = async()=>{
    const liga = 'https://pokeapi.co/api/v2/pokemon/'+id;
    axios.get(liga).then(async(response)=>{
      const respuesta = response.data;
      setPokemon(respuesta);
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImagen(respuesta.sprites.other.dream_world.front_default)
      }else{
        setImagen(respuesta.sprites.other['official-artwork'].front_default);
      }
      await getEspecie(respuesta.species.name);
      setCardClass('');
      setLoadClass('d-none')
    })
  }
  const getEspecie = async(esp)=>{
    const liga = 'https://pokeapi.co/api/v2/pokemon-species/'+esp;
    axios.get(liga).then(async(response)=>{
      const respuesta = response.data;
      setEspecie(respuesta)
      if (respuesta.habitat != null) {
        await getHabitat(respuesta.habitat.url)
      }
    })
  }
  const getHabitat = async(esp)=>{
    axios.get(hab).then(async(response)=>{
      setHabitat(response.data.names[1].name)
    })
  }
  const getDescripcion = async(esp)=>{

  }
  return (
    <Container className="bg-danger mt-3">
      <Row>
        <Col>
        <Card className="shadow mt-3 mb-3">
          <CardBody className="mt-3">
            <Row>
              <Col className="text-end">
              <Link to='/' className="btn btn-warning"><i className="fa-solid fa-home"></i>   Inicio</Link>
              </Col>
            </Row>
            <Row className={loadClass}>
              <Col md="12">
                <img src="/img/loading2.webp" className="w-100"></img>
              </Col>
            </Row>
            <Row className={cardClass}>
              <Col md="6">
                <CardText className="h1 text-capitalize">{pokemon.name}</CardText>
                <CardText className="fs-3">{descripcion}</CardText>
                <CardText className="fs-5">
                  Altura: <b>{pokemon.height/10} m</b>
                  Peso: <b>{pokemon.weight/10} kg</b>
                </CardText>
                <CardText className="fs-5">
                  Tipo:
                </CardText>
                <CardText className="fs-5">
                  Habitat: <b>{habitat}</b>
                </CardText>
              </Col>
              <Col md="6"></Col>
            </Row>
          </CardBody>
        </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Detalle