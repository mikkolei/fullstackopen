import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>    
)

const Statistics = ({ count }) => {

    let yhteensa = count.hyva + count.neutraali + count.huono

    if(yhteensa === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }

    let avg = (count.hyva + count.huono * (-1)) / yhteensa
    let pos = count.hyva / yhteensa * 100

    return (
        <table>
            <tbody>
                <Statistic text="hyvä" count={count.hyva}/>
                <Statistic text="neutraali" count={count.neutraali}/>
                <Statistic text="huono" count={count.huono}/>
                <Statistic text="keskiarvo" count={avg.toFixed(1)}/>
                <Statistic text="positiiviset" count={pos.toFixed(1)}/>
            </tbody>
        </table>   
    )
}

const Statistic = ({ text, count }) => {
    if (text === "positiiviset") {
        return (
            <tr>
                <td> {text} </td>
                <td> {count} </td>
                <td> % </td>
            </tr>  
        )
    }
    return (
    <tr>
        <td> {text} </td>
        <td> {count} </td>
    </tr>  
    )  
}

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0          
          
      }
    }
    click = (arvo) => {
        return () => {
            this.setState(((prevState) => ({
                [arvo]: prevState[arvo] + 1
            })));
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>anna palautetta</h1>
                    <div>
                        <Button 
                            handleClick={this.click("hyva")}
                            text="hyvä"
                        />
                        <Button 
                            handleClick={this.click("neutraali")} 
                            text="neutraali"
                        />
                        <Button 
                            handleClick={this.click("huono")}
                            text="huono" 
                        />
                    </div>
                    <div>
                        <h2>statistiikka</h2>
                            <div>
                                <Statistics count={this.state}/>
                            </div>
                    </div>        
                </div>
            </div>
        )
    }
}    

ReactDOM.render(<App />, document.getElementById('root'))
