import banner from '../../assets/banner.png'
import './style.css'

export default function Banner() {
    return (
        <section className='banner'>
            <img src={banner} />
        </section>
    );
}