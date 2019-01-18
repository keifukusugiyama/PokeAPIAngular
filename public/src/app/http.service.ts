import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
  }

  getPokemon(){
      console.log("getPokemon is running");
      let tempObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/700/');
      tempObservable.subscribe(pokemon => {
        console.log("Got the data for ", pokemon['name']);

        let tempObservable2 = this._http.get(pokemon['abilities'][1]["ability"].url);
        tempObservable2.subscribe(pokemonAbility => {
          console.log("Its ability is:", pokemonAbility['name']);
          console.log("Count of other pokemons that has this ability:", pokemonAbility['pokemon'].length);
          console.log("An example of another pokemon that has this ability is:", pokemonAbility['pokemon'][0]['pokemon']['name']);
        });
      })
  }
  
}