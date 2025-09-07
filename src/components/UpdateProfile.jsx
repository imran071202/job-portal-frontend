import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/apiPoint'
import { setuser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const UpdateProfile = ({ open, setopen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setinput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.profile?.skills || []
  });
  const [file, setFile] = useState(null);

  const changeEvenHandeler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("skills", Array.isArray(input.skills) ? input.skills.join(",") : input.skills);
    formData.append("bio", input.bio);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setuser(res.data.user));
        toast.success(res.data.message);
        setopen(false); // close only if success
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] bg-gray-200" onInteractOutside={() => setopen(false)}>
        <form onSubmit={submitHandeler}>
          <DialogHeader>
            <DialogTitle  className="mx-auto mb-3" >Edit profile</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Name</Label>
              <Input id="fullname" name="fullname" value={input.fullname} onChange={changeEvenHandeler} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={changeEvenHandeler} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Id</Label>
              <Input id="email" name="email" value={input.email} onChange={changeEvenHandeler} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Contact Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEvenHandeler} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" name="skills" value={input.skills.join(", ")} onChange={(e) => setinput({ ...input, skills: e.target.value.split(",").map(s => s.trim()) })} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Resume</Label>
              <Input id="file" name="file" type="file" onChange={fileChangeHandler} accept="application/pdf" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-sky-800 hover:bg-sky-950 text-white cursor-pointer mx-auto mt-5 w-full">
              {loading ? <><Loader2 className="animate-spin mr-2" /> Wait</> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// const UpdateProfile = ({ open, setopen }) => {
//     const [loading, setloading] = useState(false)
//     const { user } = useSelector(state => state.auth);
//     const dispatch = useDispatch()
//     const [file, setFile] = useState(null);

//     const fileChangeHandler = (e) => {
//         setFile(e.target.files?.[0] || null);
//     };



//     const [input, setinput] = useState({
//         fullname: user?.fullname,
//         email: user?.email,
//         phoneNumber: user?.phoneNumber,
//         bio: user?.bio,
//         skills: user?.profile?.skills?.map(skill => skill),
//         file: user?.profile?.resume
//     })

//     const changeEvenHandeler = (e) => {
//         setinput({ ...input, [e.target.name]: e.target.value })

//     }
//     //     const fileChangeHandler = (e) => {
//     //     const file = e.target.files?.[0]
//     //     setinput({ ...input, file })
//     // }

//     const submitHandeler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData()
//         formData.append("fullname", input.fullname)
//         formData.append("email", input.email)
//         formData.append("phoneNumber", input.phoneNumber)
//         formData.append("skills", input.skills.join(","));

//         formData.append("bio", input.bio)
//         if (input.file) {
//             formData.append("file", input.file)
//         }
//         try {
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             })
//             if (res.data.success) {
//                 dispatch(setuser(res.data.user))
//                 toast.success(res.data.message)
//                 setopen(false)
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message)


//         }



//     }

//     return (
//         <>
//             <Dialog open={open}>


//                 <DialogContent className="sm:max-w-[425px] bg-gray-200" onInteractOutside={() => setopen(false)}>
//                     <form onSubmit={submitHandeler}>
//                         <DialogHeader>
//                             <DialogTitle>Edit profile</DialogTitle>
//                         </DialogHeader>
//                         <div className="grid gap-4 ">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="fullname">Name</Label>
//                                 <Input id="fullname" name="fullname" value={input.fullname}
//                                     onChange={changeEvenHandeler}
//                                     defaultValue="" />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="bio">Bio</Label>
//                                 <Input id="bio" name="bio" value={input.bio} onChange={changeEvenHandeler} defaultValue="" />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email Id</Label>
//                                 <Input id="email" name="email" value={input.email} onChange={changeEvenHandeler} defaultValue="" />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="phoneNumber">Contact Number</Label>
//                                 <Input id="phoneNumber" value={input.phoneNumber} onChange={changeEvenHandeler} name="phoneNumber" defaultValue="" />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="skills">Skills</Label>
//                                 <Input id="skills" name="skills" value={input.skills.join(", ")}
//                                     onChange={changeEvenHandeler} />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="file">Resume</Label>
//                                 <Input className="md:w-fit bg-slate-200" id="file" name="file" type="file" onChange={fileChangeHandler} accept="application/pdf" />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             {
//                                 loading ? <Button type="submit" className=" my-4 hover:bg-sky-700 mx-auto border-1 w-full cursor-pointer bg-sky-500 text-white font-bold"><Loader2 />Wait</Button> : <div className="">
//                                     <Button type="submit" className="bg-sky-800 hover:bg-sky-950 text-white cursor-pointer">Save changes</Button>
//                                 </div>
//                             }

//                         </DialogFooter>
//                     </form>
//                 </DialogContent>

//             </Dialog>
//         </>
//     )
// }

export default UpdateProfile