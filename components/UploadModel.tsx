"use client"
import useUploadModel from "@/hooks/useUploadModel";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Model from "./Model";

const UploadModel = () => {
    const [isLoading , setIsLoading] = useState();
    const UploadModel = useUploadModel();
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
        if(!open){
            reset();
            UploadModel.onClose();
        }
    }

    const onSubmit : SubmitHandler<FieldValues> = async (values) => {

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