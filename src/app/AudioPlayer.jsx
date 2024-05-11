'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './Loading';

export default function AudioPlayer({ audio }) {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    function playAudio(e) {
        console.log('playing audio');
        e.currentTarget.firstChild.play();
    }

    const freeconvert = axios.create({
        baseURL: "https://api.freeconvert.com/v1",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
    });

    const requestBody = {
            myImport1: {
                operation: 'import/url',
                url: audio,
                filename: 'pokecry.ogg',
            },
            myConvert1: {
                operation: 'convert',
                input: 'myImport1',
                input_format: 'ogg',
                output_format: 'mp3',
            },
            myExport1: {
                operation: 'export/url',
                input: 'myConvert1',
            },
    };

    async function waitForJobByPolling(jobId) {
        for (let i = 0; i < 10; i++) {
            await waitForSeconds(2);
            const jobGetResponse = await freeconvert.get(`/process/jobs/${jobId}`);

            const job = jobGetResponse.data;
            if (job.status === "completed" || job.status === "failed") {
                // Return the latest job information.
                return job;
            }
        }

        throw new Error("Poll timeout");
    }
    
    async function waitForSeconds(seconds) {
        await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }

    useEffect(() => {
        async function doTheJob() {
            setLoading(true);

            const jobResponse = await freeconvert.post('/process/jobs', {
                tasks: requestBody,
            });

            const jobId = jobResponse.data.id;
            console.log("Created job", jobId);

            const job = await waitForJobByPolling(jobId);

            // Print any success or failure results:

            if (job.status === "completed") {
                console.log("Job completed.");
                const exportTask = job.tasks.find((t) => t.name === "myExport1");
                setUrl(exportTask.result.url);
                setLoading(false);
                return;
            } else {
                console.log(`Job failed. [${job.result.errorCode}] - ${job.result.msg.trim()}`);
                setUrl(audio);
                setLoading(false);
                return;
            }

        }

        doTheJob();
    }, []);

    return (
        <button
            className='absolute inset-0 hover:bg-gray-400/30 rounded-full transition'
            onClick={playAudio}
        >
            {loading ?
                <Loading />
            :   <audio src={url} />}
        </button>
    );
}
