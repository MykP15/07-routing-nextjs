"use client"

interface ErrorProps {
  error: Error;
};


function SlugError({ error }: ErrorProps) {
    return (
        <p>Could not fetch the list of notes. {error.message}</p>
    )

}

export default SlugError;