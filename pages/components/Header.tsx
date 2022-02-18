import Link from 'next/link'
import { FaBars } from "react-icons/fa";
const Header = () => {
  return (
    <>

      <div className="md:hidden">
        <div className="w-full flex justify-between items-center uppercase top-0 left-0 py-11">
          <Link href="#">
            <a className="text-24 font-bold">Studio&copy;</a>
          </Link>
          
          <Link href="#">
            <a className="text-14 font-normal" onClick={()=>alert('Design Studio')}>
              Design Studio
            </a>
          </Link>
          
          <Link href="#">
            <a className="text-14 font-normal">
              <FaBars/>
            </a>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="w-full flex justify-between uppercase top-0 left-0 py-11">
          <Link href="#">
            <a className="text-24 font-bold">Studio&copy;</a>
          </Link>
          
          <Link href="#">
            <a className="text-14 font-normal" onClick={()=>alert('Design Studio')}>
              Design Studio
              <div className="underline -mt-2">studio&#64;studio.com</div>
            </a>
          </Link>
          
          <Link href="#">
            <a className="text-14 font-normal">
              SERVICES  /  Work            
            </a>
          </Link>
          
          <Link href="#">
            <a className="text-14 font-normal">
              About  /  CONTACT
            </a>
          </Link>
        </div>
      </div>
    </>
  )

}
export default Header