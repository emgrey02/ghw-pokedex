'use client';
// import axios from 'axios';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

export default function AudioPlayer({ audio }) {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    function playAudio(e) {
        console.log('playing audio');
        e.currentTarget.firstChild.play();
    }

    const baseURL = 'https://api.freeconvert.com/v1';
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
    const requestBody = {
        tasks: {
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
        },
    };

    useEffect(() => {
        async function doTheJob() {
            let jobId;
            setLoading(true);

            const socket = io('https://notification.freeconvert.com/', {
                transports: ['websocket'],
                path: '/socket.io',
                auth: { token: `Bearer ${process.env.ACCESS_TOKEN}` },
            });

            const jobResponse = await fetch(baseURL + '/process/jobs', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            })
                .then((res) => {
                    jobId = res.data.id;
                    console.log('created job', jobId);
                })
                .catch((error) => console.log(error));

            socket.on('job_completed', (data) => {
                console.log('Job completed', data.id);
                const exportTask = data.tasks.find(
                    (t) => t.name === 'myExport1',
                );
                setUrl(exportTask.result.url);
                socket.emit('unsubscribe', `job.${data.id}`);
                socket.disconnect();
                return;
            });

            // Subscribe to events of the created job.
            console.log('Start waiting for job', jobId);
            socket.emit('subscribe', `job.${jobId}`);
        }

        doTheJob();
    }, []);

    return (
        <button
            className='absolute inset-0 hover:bg-gray-400/30 rounded-full transition'
            onClick={playAudio}
        >
            {loading ?
                <></>
            :   <audio src={url} />}
        </button>
    );
}
