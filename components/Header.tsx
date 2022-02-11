import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className="w-full flex justify-between uppercase top-0 left-0 px-16 py-11">
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
    </>
  )

}
export default Header