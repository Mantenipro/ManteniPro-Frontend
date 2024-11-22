import { useState } from 'react';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import LefthDashboard from '@/components/LefthDashboard';

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className={`${montserrat.className} h-dvh flex flex-row lg:flex-grow relative`}>
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="text-white bg-[#31416d]  p-2 rounded-md focus:outline-none"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full  fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <div className="lg:w-[85%] w-full p-4 lg:ml-0 mt-[15%] md:mt-[7%] ">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis laboriosam fuga perspiciatis dignissimos deleniti fugit repellat repellendus harum corporis illo est alias officia nobis, dicta ipsa cupiditate quos nulla temporibus?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor obcaecati aliquam assumenda voluptatibus blanditiis quaerat deserunt vel nobis rem veritatis, fuga numquam cumque voluptates? Laudantium optio veritatis corrupti quo illum?
          Necessitatibus molestiae esse eveniet repellendus atque nobis, excepturi eaque unde rerum? Labore totam corporis sit quas facere quam saepe debitis omnis rem. Sint doloremque veniam maiores animi laboriosam nihil modi.
          Laudantium magni itaque omnis ex dignissimos? Voluptatem sapiente consequatur impedit commodi recusandae, eaque consectetur! Nihil sapiente, vitae labore nemo ea modi eligendi aliquid. Accusamus quas debitis eos quisquam voluptatem veritatis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur, minima voluptate ut ipsam aspernatur iusto quod tenetur sed et ea at atque vero aut! Minima nulla praesentium minus quod!
          A veritatis et fuga asperiores, saepe sint nulla iure libero corporis eveniet perferendis tempore, explicabo, molestias aperiam fugit vero consequuntur possimus numquam omnis. Cupiditate dolores laudantium possimus aliquam quae voluptatibus.
          Sunt vero accusamus reprehenderit exercitationem dolor repudiandae dolorum recusandae molestiae repellendus dolores atque quia suscipit inventore sed fuga cupiditate illo consequuntur laboriosam sapiente dignissimos expedita, reiciendis tempore saepe officiis. Doloremque.
          Distinctio, perferendis. Harum dignissimos omnis consectetur asperiores ex, maiores perferendis saepe et tenetur officia totam nihil doloribus delectus, sequi cumque ducimus dolore tempore iste voluptatibus blanditiis nostrum! Minus, dolorum adipisci?
          Atque omnis nisi saepe commodi veniam excepturi quo minima facilis recusandae obcaecati. Quis animi sed exercitationem ea aperiam doloribus temporibus ducimus. Voluptatibus at a nisi debitis hic aut dolores autem?
          Eius omnis quos sint, aperiam ut deserunt accusamus perferendis facilis, nostrum molestias minima autem assumenda dolore labore tempore alias molestiae! Nisi, voluptatum vero? Hic distinctio error non assumenda ea quia!
          Impedit sunt eos quibusdam maxime officia tempora distinctio iure facere iste? Officia exercitationem, distinctio laborum beatae debitis harum enim veritatis quo dolorem repellendus. Quia laborum, eius reiciendis alias laudantium architecto.
        one earum, eaque repudiandae? Voluptates facere vero placeat aut sequi consequatur perspiciatis.
        </p>
      </div>
    </main>
  )
}
