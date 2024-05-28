import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Email({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, setmessage] = useState([])
    useEffect(() => {
      const fetchLandlord=async()=>{
        try {
           const res=await fetch(`/api/user/${listing.userRef}`)
           const data = await res.json();
           if(data.success===false){
            return ;
           }  
           setLandlord(data);
        } catch (error) {
            console.log(error.message);
        }
      };
      fetchLandlord();
    }, [listing.userRef])
    const handleChange=(e)=>{
        setmessage(e.target.value);
    }
  return (
    <>
        {landlord &&
        <div className="flex flex-col gap-4">
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
            <textarea onChange={handleChange} name="message" id="message" value={message}rows="3" placeholder='Write your message here...' className='w-full rounded-lg'>

            </textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white uppercase     p-3 rounded-lg hover:opacity-90 text-center'>
                Send mail
            </Link>
        </div>
            
        }
    </>
  )
}
