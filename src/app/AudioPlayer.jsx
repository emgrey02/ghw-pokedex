'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './loading';

export default function AudioPlayer({ audio }) {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const freeconvert = axios.create({
        baseURL: 'https://api.freeconvert.com/v1',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
    });

    useEffect(() => {
        async function doTheJob() {
            setLoading(true);
            try {
                const jobResponse = await freeconvert.post('/process/jobs', {
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
                });

                const jobId = jobResponse.data.id;
                console.log('created job', jobId);

                const job = await waitForJob(jobId);

                if (job.status === 'completed') {
                    console.log('Job completed.');
                    const exportTask = job.tasks.find(
                        (t) => t.name === 'myExport1',
                    );
                    let url = exportTask.result.url;
                    setUrl(url);
                    setLoading(false);
                    return;
                } else {
                    console.log(
                        `Job failed. [${job.result.errorCode}] - ${job.result.msg.trim()}`,
                    );
                    setLoading(false);
                    return;
                }

                async function waitForJob(jobId) {
                    const jobGetResponse = await freeconvert.get(
                        `/process/jobs/${jobId}`,
                    );

                    const job = jobGetResponse.data;
                    if (job.status === 'completed' || job.status === 'failed') {
                        // Return the latest job information.
                        return job;
                    }
                }
            } catch (error) {
                console.log(`!!!ERROR!!! ${error} !!!ERROR!!!`);
                setUrl(audio);
                setLoading(false);
            }
        }

        doTheJob();
    }, []);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <audio
                controls
                src={url}
            />
        );
    }
}
