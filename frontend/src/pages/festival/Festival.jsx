import React from 'react';
import FestivalHero from '../../components/festival/FestivalHero';
import FestivalBooking from '../../components/festival/FestivalBooking';
import FestivalEssentialsShop from '../../components/festival/FestivalEssentialsShop';
import UpcomingFestivals from '../../components/festival/UpcomingFestivals';
import LearnMoreFestival from '../../components/festival/LearnMoreFestival';
import BookPandit from '../../components/festival/BookPandit';
import FestivalReminder from '../../components/festival/FestivalReminder';

const Festival = () => {
  return (
    <div className='bg-[#FAF5EF]'>
        <FestivalHero />
        <FestivalBooking />
        <FestivalEssentialsShop />
        <UpcomingFestivals />
        <LearnMoreFestival />
        <BookPandit />
        <FestivalReminder />
    </div>
  )
}

export default Festival;