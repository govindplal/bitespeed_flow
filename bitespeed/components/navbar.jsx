import { Button } from './ui/button'

const Navbar = ({saveFlow}) => {
  return (
    <div className='flex w-full py-2 px-[3vw] bg-slate-200 justify-end'>
        <button
        variant = "outline" 
        onClick ={saveFlow}
        >
            Save changes
        </button>
    </div>
  )
}

export default Navbar