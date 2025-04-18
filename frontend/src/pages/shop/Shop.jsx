import React from 'react'
import ShopProduct from '../../components/shop/ShopProduct';
import FestivalOfferBanner from '../../components/shop/FestivalOfferBanner';
import NewsletterSectionProduct from '../../components/shop/NewsletterSectionProduct';

const Shop = () => {
  return (
    <div className='bg-[#FAF5EF]'>
        <ShopProduct/>
        <FestivalOfferBanner/>
        <NewsletterSectionProduct/>
        
    </div>
  )
}

export default Shop