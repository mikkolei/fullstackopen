import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
        </div>
    )    
}

const Otsikko = ({ kurssi }) => (
    <h2>{kurssi.nimi}</h2>
)

const Osa = (props) => (
    <p>{props.osa} {props.tehtavia} </p>
)

const Sisalto = ({ kurssi }) => {
    const t = kurssi.osat
    return (
    <div>
        {t.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        <Yhteensa kurssi={kurssi} />
    </div>  
    )  
}

const Yhteensa = ({ kurssi }) => {
    const t = kurssi.osat
    const summa = t.reduce((yhteensa, k) => yhteensa + k.tehtavia, 0)
    return (
        <p>Yhteensä {summa} tehtävää</p>
    )    
}

export default Kurssi