"use client";

import Header from "@/components/Header";
import { useRouter } from "next/router";

const Lyrics = () => {
    const router = useRouter();
    const lyrics = router.query.lyrics as string;

    return (
        <Header>
            <div>
                <h1>Lyrics</h1>
                <p>{lyrics}</p>
            </div>
        </Header>
    );
};

export default Lyrics