import React, { useEffect, useState } from 'react'

const Admin = () => {
    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')

    // Загрузка данных при монтировании
    useEffect(() => {
        fetch('http://localhost:7777/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => console.error('Ошибка загрузки данных:', err))
    }, [])

    // Добавление нового продукта
    const handleAddProduct = (e) => {
        e.preventDefault()

        if (!title || !image || !price) {
            alert("Пожалуйста, заполните все поля")
            return
        }

        const newProduct = {
            title,
            image,
            price: parseFloat(price)
        }

        fetch('http://localhost:7777/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(added => {
                setProducts(prev => [...prev, added])
                setTitle('')
                setImage('')
                setPrice('')
            })
            .catch(err => console.error("Ошибка при добавлении товара:", err))
    }

    // Удаление товара
    const handleDelete = (id) => {

        fetch(`http://localhost:7777/products/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setProducts(prev => prev.filter(p => p.id !== id))
            })
            .catch(err => console.error("Ошибка при удалении товара:", err))
    }

    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={handleAddProduct} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {
                    products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>{product.title}</h3>
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                            <p>{product.price}$</p>
                            <button onClick={() => handleDelete(product.id)} className='del'>Удалить</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Admin
