import React, { useState, useRef, useEffect } from 'react'
import './App.css'

const brands = [
  {
    name: 'Adidas',
    logo: '/adidas-logo.png',
    colors: ['#000000', '#FFFFFF'],
    values: ['Performance', 'Passion', 'Integrity', 'Diversity'],
    typography: 'AdiHaus',
    history: 'Founded in 1949 by Adolf Dassler, Adidas has become one of the world\'s leading sportswear brands.'
  },
  {
    name: 'Nike',
    logo: '/nike-logo.png',
    colors: ['#F96302', '#FFFFFF'],
    values: ['Innovation', 'Sustainability', 'Diversity', 'Community'],
    typography: 'Nike Futura',
    history: 'Founded as Blue Ribbon Sports in 1964 and becoming Nike 1971, Nike is a global leader in athletic footwear and apparel.'
  },
  {
    name: 'Tesla',
    logo: '/tesla-logo.png',
    colors: ['#CC0000', '#000000'],
    values: ['Innovation', 'Sustainability', 'Performance', 'Design'],
    typography: 'Tesla Sans',
    history: 'Founded in 2003, Tesla has led the electric vehicle revolution and expanded into sustainable energy solutions.'
  },
  {
    name: 'Apple',
    logo: '/apple-logo.png',
    colors: ['#999999', '#FFFFFF'],
    values: ['Innovation', 'Design', 'Privacy', 'Environment'],
    typography: 'San Francisco',
    history: 'Founded in 1976 by Steve Jobs and Steve Wozniak, Apple has become a technology giant known for its innovative products.'
  }
]

function BrandCard({ brand }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const logoRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !logoRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotation({ x: rotateX, y: rotateY })
    logoRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    if (logoRef.current) {
      logoRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <div 
      className={`brand-card ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card-front">
        <div className="brand-logo-container">
          <img 
            src={brand.logo} 
            alt={`${brand.name} logo`} 
            className="brand-logo" 
            ref={logoRef}
          />
        </div>
        <h2>{brand.name}</h2>
      </div>
      <div className="card-back">
        <h3>Brand Colors:</h3>
        <div className="color-palette">
          {brand.colors.map((color, index) => (
            <div key={index} className="color-box" style={{ backgroundColor: color }}></div>
          ))}
        </div>
        <h3>Brand Values:</h3>
        <ul className="brand-values">
          {brand.values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <h3>Typography: {brand.typography}</h3>
        <p><strong>History:</strong> {brand.history}</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Brand Showcase</h1>
      <div className="brand-grid">
        {brands.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>
    </div>
  )
}

export default App