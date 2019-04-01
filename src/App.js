import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Movie from './movie';


class App extends Component {

  state = {}

  componentDidMount() {
    this._getMovies();
  }

  // 영화리스트를 불러오는 function
  // _ 를 쓰는 이유는 자체기능과 자체기능이 아닌것을 구분하기위해, 나의 기능은 _ 로 시작함
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title ={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        />
    })
    // 영화리스트들은 movies라는 한곳에 저장함
    return movies
  }

  _getMovies = async () => {
    const movies =  await this._callApi()
    this.setState({
      movies
    })
    
  }
  
  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    // .then(response => console.log(response))
    .then(potato => potato.json()) // json으로 바꿔주기
    .then(json => json.data.movies)
    .then(    setTimeout((() => {
      console.log("callApi하는중")
    }),10000))
    .catch(err => console.log(err))
    
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loawding"}>
      {this.state.movies ? this._renderMovies() : 'Loading '}
      </div>
    );
  }
}

export default App;
