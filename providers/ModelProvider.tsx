"use client";

import AuthModel from "@/components/AuthModel";
import UploadModel from "@/components/UploadModel";
import { useEffect, useState } from "react";

const ModelProvider = () => {
    const [isMounted , setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModel/>
            <UploadModel/>
        </>
    );
}

export default ModelProvider;