import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='flex w-full py-2 px-[3vw] bg-slate-200 justify-end'>
        <Button variant = "outline">Save changes</Button>
    </div>
  )
}

export default Navbar