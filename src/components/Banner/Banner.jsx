import bannerImg from '../../assets/banner/banner_2.png'
import './banner.css'

const Banner = () => {
    return (
        <div className="bg-primary2 top_header">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center py-3 px-4 lg:px-0">
                <div className='md:flex-1 text-center md:text-left'>
                    <h1 className="text-4xl md:text-5xl text-primary1 font-semibold">এডমিশন বাস টিকেট</h1>
                    <p className="text-primary1 font-semibold text-xl mt-8">স্বপ্নের বিশ্ববিদ্যালয়ে ভর্তি পরিক্ষা দিতে যাওয়ার নিরাপদ ও সহজ মাধ্যম।</p>
                </div>
                <div className='md:flex-1 flex justify-end md:pr-5'>
                    <img src={bannerImg} alt="" className='w-full' />
                </div>
            </div>
        </div>
    );
};

export default Banner;