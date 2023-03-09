import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from "./components/AddMovieForm";
import axios from 'axios';
import EditMovieForm from "./components/EditMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [darkMode, setDarkMode]=useState(true);
  const {push}=useHistory();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {

  axios
  .delete(`http://localhost:9000/api/movies/${id}`)
  .then((res)=>{
    if(res.status!==200){
      console.log('sildi');
      //getCoff();
      const kalanlar=movies.filter(movie=>movie.id!==movies.id)
      setMovies(kalanlar)
      push("/movies")
    }
  })
  .catch((err)=>console.log(err))
  }

  const addToFavorites = (movie) => {
if(!favoriteMovies.find((mov)=>mov.id===movie.id)){
  console.log("fav ID EKLENDİ");
  setFavoriteMovies([...favoriteMovies, movie]);
} else {
  console.log(" FAV ZATEN BURADA")
}
  };

  return (
    <div className={darkMode && `dark bg-slate-900 h-screen`}>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList darkMode={darkMode} favoriteMovies={favoriteMovies} />

          <Switch>

            <Route exact path="/movies/add">
              <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm/>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovieCB={deleteMovie} addToFavorites={addToFavorites}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>

            
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

