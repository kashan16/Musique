"use client"
import useUploadModel from "@/hooks/useUploadModel";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import Button from "./Button";
import Input from "./Input";
import Model from "./Model";

const UploadModel = () => {
    const [isLoading , setIsLoading] = useState(false);
    const UploadModel = useUploadModel();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {register , handleSubmit , reset} = useForm<FieldValues>(
        {
            defaultValues : {
                author : '',
                title : '',
                song : null,
                image : null
            }
        }
    )
    const onChange = (open : boolean) => {
        if(open){
            reset();
            UploadModel.onClose();
        }
    }

    const onSubmit : SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user)
            {
                toast.error("Missing Fields");
                return;
            }
            const uniqueID = uniqid();
            //upload songs
            const {
                data : songData,
                error : songError
            } = await supabaseClient.storage.from('Songs').upload(`song-${values.title}-{uniqueID}`, songFile , {
                cacheControl: '3600',
                upsert : false
            })

            if(songError){
                setIsLoading(false);
                return toast.error('Failed to upload song.');
            }
            //upload image
            const {
                data : imageData,
                error : imageError
            } = await supabaseClient.storage.from('Image').upload(`image-${values.title}-{uniqueID}`, imageFile , {
                cacheControl: '3600',
                upsert : false
            })

            if(imageError){
                setIsLoading(false);
                return toast.error('Failed to upload image.');
            }

            const {
                error : supabaseError
            } = await supabaseClient.from('Songs').insert({user_id : user.id , title : values.title , author : values.author , image_path : imageData.path , song_path : songData.path});

            if(supabaseError)
            {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Song Created');
            reset();
            UploadModel.onClose();
        }
        catch (error) {
            toast.error("Something went wrong");
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Model title = "Add a SONG" description="Upload an MP3 file" isOpen onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input id = "title" disabled = {isLoading} {...register('title' , {required : true})} placeholder = "Song title"/>
                <Input id = "author" disabled = {isLoading} {...register('author' , {required : true})} placeholder = "Song author"/>
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input id = "song" type = "file" disabled = {isLoading} accept = ".mp3" {...register('song' , {required : true})} placeholder = "Song file"/>
                    <div className="pb-1">
                        Select a Image
                    </div>
                    <Input id = "image" type = "file" disabled = {isLoading} accept = "image/*" {...register('image' , {required : true})} placeholder = "Image Art"/>
                </div>
                <Button disabled = {isLoading} type = "submit"> Create </Button>
            </form>
        </Model>
    );
}

export default UploadModel;