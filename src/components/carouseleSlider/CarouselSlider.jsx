import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/search/b1.png';
import img2 from '../../assets/search/b2.png';
import img3 from '../../assets/search/b3.png';
import img4 from '../../assets/search/b4.png';

const CarouselSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
<div>
<Slider className='max-w-7xl mx-auto' {...settings}>
      <div>
        <img src={img1} alt="Image 1" />
      </div>
      <div>
        <img src={img2} alt="Image 2" />
      </div>
      <div>
        <img src={img3} alt="Image 3" />
      </div>
      <div>
        <img src={img4} alt="Image 4" />
      </div>
     
    </Slider>
</div>
  );
};

export default CarouselSlider;
