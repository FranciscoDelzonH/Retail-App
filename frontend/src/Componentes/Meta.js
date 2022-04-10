
import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Bienvenido a Retail App | Home | Encuentra los productos a los mejores precios',
    description: 'Aprovecha nuestras ofertas',
    keywords: 'productos electronicos, Iphone , Amazon , '

}

export default Meta