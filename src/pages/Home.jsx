import React, { useEffect, useState } from 'react'

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:7777/products')
      .then(data => data.json())
      .then(json => setProducts(json))
  }, [])

  return (
    <div className='grid'>
      {
        products.map((c, i) => (
          <div key={i}>
            <h1>{c.title}</h1>
            <img src={c.image} alt={c.title} />
            <h1>{c.price}$</h1>
          </div>
        ))
      }
    </div>
  )
}

export default Home