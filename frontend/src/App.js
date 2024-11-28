import Map,{Marker, Popup} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import {format} from "timeago.js";
import Register from './register/Register';


function App() {

  const [currentuser,setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace,setNewPlace] = useState(null);
  const [title,setTitle] = useState(null);
  const [desc,setDesc] = useState(null);
  const [rating,setRating] = useState(0);
  const [viewState, setViewState]=useState({
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 6,
  });

  //fetches all the pins when the page is loaded
  useEffect(()=>{
    const getPins = async ()=>{
      try{
        const res = await axios.get('/pins')
        // console.log(res.data);
        setPins(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getPins() 
  },[])

  const handleMarkerClick = (id,long,lat)=>{
    console.log(`handler clicked with ${id}`);
    setCurrentPlaceId(id);
    setViewState((prev)=>({
      ...prev,
      longitude: long,
      latitude: lat,
      zoom: 7,
      transitionDuration: "1000",
      transitionInterpolator: 'ease-out'
    }))
  }

  const handleAddClick = (e) =>{
    console.log(e.lngLat);
    if (!e.lngLat) {
      console.error("Invalid lngLat format:", e.lngLat);
      return;
    }
  
    const {lng,lat} = e.lngLat;
    setNewPlace({
      lat,
      long: lng,
    });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPin = {
      username: currentuser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }

    try{
      const res = await axios.post('/pins',newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
      console.log("error",err)
    }
  };

  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{width:"100vw", height: "100vh"}}
        onDblClick={handleAddClick}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {pins.map(p=>(
          <div key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
              <RoomIcon 
                style={{color:"red", fontSize:"48px", 
                  zIndex:10,
                  color: p.username === currentuser?'tomato':'slateblue',
                  cursor: "pointer"
                }} 
                onClick={()=>handleMarkerClick(p._id,p.long,p.lat)}
              />
            </Marker>
            {p._id === currentPlaceId &&
              <Popup 
                longitude={p.long} 
                latitude={p.lat}
                anchor='left'
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className='card'>
                <label>Place</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <p className='desc'>{p.desc}</p>
                <label>Rating</label>
                <div className='stars'>
                {Array(p.rating).fill(<StarIcon className='star'/>)}
                </div>
                <label>Information</label>
                <span className='username'>Created by <b>{p.username}</b></span>
                <span className='date'>{format(p.createdAt)}</span> 
                </div>
              </Popup>
            }
          </div>
        ))}
        {newPlace && 
          <Popup 
            longitude={newPlace.long} 
            latitude={newPlace.lat}
            anchor='left'
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                  placeholder='Enter a title'
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea 
                  placeholder='say us something about this place'
                  onChange={(e)=>setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className='submitButton' type='submit'>Add Pin</button>
              </form>
            </div>
          </Popup>
        }

        {currentuser ? 
          (<button className='button logout'>Log out</button>):
          (
            <div className='buttons'>
              <button className='button login'>Login</button>
              <button className='button register'>Register</button>
            </div>
          )
        }

        <Register />
      </Map >
    </div>
  );
}

export default App;
