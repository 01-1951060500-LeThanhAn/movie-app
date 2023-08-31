import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../stored/store";
import { getProfile } from "../../actions/fireStoreActions";
import { useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useStore();
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();

  useEffect(() => {
    async function fetchProfile(ids) {
      const data = await getProfile(ids);

      setProfile(data);
    }

    fetchProfile(id);
  }, [id, profile?.photoURL]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: profile?.displayName,
      });
      setProfile(profile);
      setUser({
        ...user,
        displayName: profile?.displayName,
      });
      setOpen(false);
      toast.success("Updated profile success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeProfileImage = async (e) => {
    try {
      setLoading(true);
      if (!user) return;

      const form = new FormData();
      // @ts-ignore
      form.append("image", e.target.files[0]);
      const res = await axios({
        method: "post",
        url: `https://api.imgbb.com/1/upload?expiration=600&key=07609500372a943456d4c85cd7108d5a`,
        data: form,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(res.data);

      updateProfile(user, {
        photoURL: res.data.data?.display_url,
      }).finally(() => {
        setLoading(false);
        toast.success("Update photo successfully");
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="pt-24">
        {user && (
          <>
            <p className="2xl:px-32 lg:px-16 text-3xl font-bold text-center">
              ACCOUNT SETTINGS
            </p>
            <div className="pt-12 lg:flex-row lg:px-10 2xl:px-56 lg:justify-between flex flex-col justify-center ">
              <div className="lg:w-1/2 2xl:w-1/2">
                <div className="px-4 py-6">
                  <p className="text-2xl font-semibold">User Information</p>
                  <p className="mt-4 text-slate-400">
                    {" "}
                    Here you can edit public information about yourself. If you
                    signed in with Google or Facebook, you can't change your
                    email and password.
                  </p>
                </div>
                <div className=" w-full px-4 flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">Email</p>
                    <h2 className="text-slate-400 pt-2">{profile?.email}</h2>
                  </div>
                  <div className="text-2xl cursor-pointer font-bold">
                    <AiOutlineEdit />
                  </div>
                </div>

                <div className="mt-6 w-full px-4 flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">Name</p>
                    {open ? (
                      <input
                        name="displayName"
                        ref={nameRef}
                        value={profile?.displayName}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="bg-slate-800 px-2 py-2 outline-none w-full"
                        type="text"
                        placeholder="Enter name"
                      />
                    ) : (
                      <h2 className="text-slate-400 pt-2">
                        {profile?.displayName}
                      </h2>
                    )}
                  </div>
                  {open ? (
                    <p className="cursor-pointer" onClick={handleUpdateProfile}>
                      update
                    </p>
                  ) : (
                    <div
                      onClick={() => setOpen(!open)}
                      className="text-2xl cursor-pointer font-bold"
                    >
                      <AiOutlineEdit />
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:w-1/2 2xl:w-1/2 mx-4 mt-6 flex flex-col justify-center items-center">
                <div className="">
                  <LazyLoadImage
                    className="w-52 h-52 object-cover rounded-full "
                    src={!loading ? profile?.photoURL : null}
                    alt=""
                  />
                </div>

                <input
                  type="file"
                  onChange={changeProfileImage}
                  id="photo"
                  hidden
                  accept="image/*"
                />
                <label htmlFor="photo" className="mt-3 bg-slate-800 px-3 py-2">
                  Upload new photo
                </label>

                <p className="mt-4 py-2 rounded-xl text-slate-300 px-8 lg:px-2 2xl:px-6">
                  When you envy successful people, you create a negative
                  attraction that pushes you away from what you should be doing
                  to be successful. When you admire successful people, you
                  create a positive attraction that pulls you closer and closer
                  to the person you want to be.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
