import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }
  
  click = (name) => {
    return () => {
      this.setState({ filter: name })
    }
  }

  render() {
    const countriesToShow = 
      this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <form>
          find countries: <input value={this.state.filter} onChange={this.handleFilter} />
        </form>
        <CountryList filteredCountries={countriesToShow} click={this.click}/>
      </div>  
    )
  }
}

const CountryList = ({ filteredCountries, click }) => {
  if(filteredCountries.length > 10) {
    return (
      <div>
        <p>too many matches, specify another filter</p>
      </div>  
    )
  } else if(filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map(country => <CountryView key={country.name} country={country} />)}
      </div>
    )
  } else {
    return (
      <div>
        {filteredCountries.map(country => <Country key={country.name} country={country.name} click={click} />)}
      </div>  
    )
  }
}

const Country = ({ country, click }) => {
  return (
    <div onClick={click(country)}>{country}</div>
  )
}

const CountryView = ({ country }) => {
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <div>
        <p>capital: {country.capital} </p>
        <p>population: {country.population} </p>
        <img src={country.flag} alt={country.name} height="250" width="400" />
      </div>  
    </div>  
  )
}

export default App;