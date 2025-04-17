import React from 'react'
import Carousel from '../../components/home/Carousel';
import Discover from '../../components/home/Discover';
import ProductFeatures from '../../components/home/ProductFeatures';
import PriestBookingSection from '../../components/home/PriestBookingSection';
import UpcomingFestivals from '../../components/home/UpcomingFestivals';
import BlogSection from '../../components/home/BlogSection';
import Testimonials from '../../components/home/Testimonials';
import NewsletterSection from '../../components/home/NewsletterSection';

const Home = () => {
  return (
    <div>
     <Carousel/>
     <Discover/>
     <ProductFeatures/>
      <PriestBookingSection/>
      <UpcomingFestivals/>
      <BlogSection/>
      <Testimonials/>
      <NewsletterSection/>
    </div>
    
  )
}

export default Home